import { RecoilState, RecoilValueReadOnly, selector } from 'recoil';
import { currentEventAtom } from '@components/Home/home.atoms';
import projectApi from '@components/Project/projects.api';
import {
  currentProjectPaginationPage,
  currentSortType, SortOrder,
} from '@components/Home/components/SelectionProjects/Pagination/pagination.atom';

export const sortTypeLabels = {
  [SortOrder.DescendingRating]: 'По убыванию рейтинга',
  [SortOrder.AscendingRating]: 'По возрастанию рейтинга',
  [SortOrder.Alphabetical]: 'По алфавиту',
};
export const changeCurrentPage:RecoilValueReadOnly<number> = selector({
  key:'change_current_page',
  get:async ({get})=>{
   const currentPage = get(currentProjectPaginationPage)
    return currentPage
  }
})

export const changeSortType = selector({
  key:'change_sort_type',
  get:async ({get})=>{
    const currentSort = get(currentSortType)
    return{
      currentValue:{
        value:currentSort,
        label:sortTypeLabels[currentSort]
      },
    }
  }
})

export const getAllSortOptions = selector({
  key:'get_all_sort_type',
  get:async ()=> {
    return Object.entries(sortTypeLabels).map(([value, label]) => ({
      value,
      label,
    }));
  }
})

