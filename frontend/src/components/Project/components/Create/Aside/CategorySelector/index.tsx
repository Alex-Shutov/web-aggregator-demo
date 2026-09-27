import React from 'react';
import Select from '@shared/Selector';
import { SortOrder } from '@components/Home/components/SelectionProjects/Pagination/pagination.atom';
import { sortTypeLabels } from '@components/Home/components/SelectionProjects/Pagination/pagination.selector';
import useCategories from '@components/Home/components/Categories/hooks/useCategories';
import { flattenCategories, transformCategories } from '@utils/transfrom';
import { IProjectWithFunctions } from '@components/Project/projects.types';
interface IProps{
  project:IProjectWithFunctions
}

const Index:React.FC<IProps> = ({ project }) => {

  const { categoriesList } = useCategories()
  const categories = flattenCategories(categoriesList)


  const handleCategoryChange = (value:string) => {
    // const { name, value } = e.target;
    project.updateProjectState({ ...project, ['categoryId']: value })
    // Update project state with new values
  };
  return (
    <div className="text-gray-400">
      <Select
        label="Категория проекта"
        name="category"
        onChange={handleCategoryChange}
        options={categories}
        prop="name"
        idProp="id"
        placeholder="Выберите категорию"
        currentValue={project?.categories?.length || project?.categoryId ? categories?.find(el=>{
          if(project.categories)
            return el?.id === project?.categories[0]?.id
          if (project.categoryId)
            return el?.id === project.categoryId
          return false
        })?.name ?? '' : ''}
      />
    </div>
  );
};

export default Index;