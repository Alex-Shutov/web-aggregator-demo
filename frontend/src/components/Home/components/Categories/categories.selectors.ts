import { selector } from 'recoil';
import homeApi from '@components/Home/home.api';
import { allCategoriesList } from '@components/Home/components/Categories/categories.atoms';
import { ICategoryProps } from '@components/Home/components/Categories/categories.types';
import { transformCategories } from '@utils/transfrom';

export const getAllCategories = selector({
  key:'categories_get_all',
  get:async ({get})=>{
    const categories = get(allCategoriesList)
    if(categories && categories.length){
      return categories
    }
    const response =  await homeApi.getAllCategories()
    if (response.status==='success'){
      return transformCategories(response.body)
    }
  }
})







