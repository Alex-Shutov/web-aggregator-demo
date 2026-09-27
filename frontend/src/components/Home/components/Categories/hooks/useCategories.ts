import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allCategoriesList } from '@components/Home/components/Categories/categories.atoms';
import { getAllCategories } from '@components/Home/components/Categories/categories.selectors';

const UseCategories = () => {
  const [categoriesList,setCategoriesList] = useRecoilState(allCategoriesList)
  const fetchedAllCategories = useRecoilValue(getAllCategories)??[]
  setCategoriesList(fetchedAllCategories)
  const toogleCategory = (id: string, childId?: string) => {
    setCategoriesList((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === id) {
          // Если это главная категория
          if (!childId) {
            return { ...category, isChecked: !category.isChecked };
          }

          // Если это дочерняя категория
          return {
            ...category,
            childCategories: category.childCategories?.map((child) =>
              child.id === childId ? { ...child, isChecked: !child.isChecked } : child
            ),
          };
        }

        // Если это не затрагиваемая категория
        return {
          ...category,
          childCategories: category.childCategories?.map((child) =>
            child.id === childId
              ? { ...child, isChecked: !child.isChecked }
              : { ...child }
          ),
        };
      });
    });
  };


  // useEffect(() => {
  //
  //   setCategoriesList(fetchedAllCategories)
  // }, []);



  return {categoriesList,toogleCategory}
};

export default UseCategories;