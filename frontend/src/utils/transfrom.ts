import { ICategoryProps } from '@components/Home/components/Categories/categories.types';

export function transformCategories(categories: any[]): ICategoryProps[] {
  const result: ICategoryProps[] = [];
  const categoryMap: { [key: string]: ICategoryProps } = {};

  // Создаем объекты категорий и сохраняем их в categoryMap
  for (const category of categories) {
    const { id, name, parentId } = category;
    categoryMap[id] = { id, name, isChecked: false, childCategories: [] };

    if (parentId === null) {
      result.push(categoryMap[id]);
    } else {
      if (!categoryMap[parentId]) {
        categoryMap[parentId] = { id: parentId, name: '', isChecked: false, childCategories: [] };
      }
      categoryMap[parentId].childCategories!.push(categoryMap[id]);
    }
  }

  return result;
}

export function transformToNewSet(prev: Set<"userData" | "teamData" | "projectData">,valueToAdd: "userData" | "teamData" | "projectData"){
  const newChanges = new Set(prev); // Создаем новый Set
  newChanges.add(valueToAdd); // Добавляем новое значение
  return newChanges; // Возвращаем новый Set
}

export function flattenCategories(categories: ICategoryProps[]): ICategoryProps[] {
  return categories.flatMap(category => {
    if (!category.childCategories || category.childCategories.length === 0) {
      return [category];
    }

    return [
      category,
      ...flattenCategories(category.childCategories),
    ];
  });
}