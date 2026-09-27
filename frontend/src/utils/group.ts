import { IProjectCategoryProps } from '@components/Home/components/Categories/categories.types';

export function groupCategoriesNamesByParentName(categories: IProjectCategoryProps[]): [string, string[]][] {
  if (!categories) return [];

  const result: Record<string, string[]> = {};

  for (const category of categories) {
    const { name, parent } = category;

    if (!parent) {
      // Если у категории нет родителя, пропускаем ее
      continue;
    }

    if (!result[parent.name]) {
      result[parent.name] = [];
    }

    result[parent.name].push(name);
  }

  return Object.entries(result);
}
