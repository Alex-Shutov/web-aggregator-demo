export interface ICategoryProps{
  id:string
  name:string
  isChecked:boolean
  childCategories?:ICategoryProps[]
}

export interface IProjectCategoryProps{
  id:string
  name:string
  parentId:string|null
  parent:IProjectCategoryProps
}