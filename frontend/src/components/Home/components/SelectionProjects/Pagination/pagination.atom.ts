import { atom } from 'recoil';

export enum SortOrder {
  DescendingRating = 'descending',
  AscendingRating = 'ascending',
  Alphabetical = 'alph',
}
export const currentProjectPaginationPage = atom<number>({
  key:'/rpject_pagination',
  default:1
})

export const currentSortType = atom<SortOrder>({
  key:'/project_sortType',
  default:SortOrder.DescendingRating
})