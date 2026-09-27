import { RecoilValueReadOnly, selector } from 'recoil';
import homeApi from '@components/Home/home.api';
import { IEvent } from '@components/Home/home.types';

export const getHomeEventsList:RecoilValueReadOnly<IEvent[]> = selector({
  key:'/menu/selector',
  get:async ({get})=>{
    const allFilters = await homeApi.getAllEvents()
      if (allFilters.status === 'success'){
        return allFilters.body
      }

  },
  cachePolicy_UNSTABLE:{eviction:'keep-all'}
})