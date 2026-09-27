import { atom } from 'recoil';
import { ICategoryProps } from '@components/Home/components/Categories/categories.types';




export const allCategoriesList = atom<ICategoryProps[]>({
  key:'/categories',
  default:[]
})








