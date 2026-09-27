import { selector } from 'recoil';
import { authedAtom as userAtom,userRatesAtom } from '@components/User/user.atom';
import userApi from '@components/User/user.api';
import { currentEventAtom } from '@components/Home/home.atoms';

export const authUser = selector({
  key:'/user/selector',
  get:({get})=>{
    const state = get(userAtom)
    if(state.loadedUser?.id) state.authStage = 'logged'
    else if(!state.isLoading && !state.loadedUser?.id) state.authStage = 'logged_out'
    else if ( state.isLoading && !state.loadedUser?.id) state.authStage = 'unknown';
    return state
  }
})

export const usersRatesSelector = selector({
  key:'/rates/user/selector',
  get: async({get})=>{
    const state = get(userAtom)
    const event = get(currentEventAtom)
    if(event?.id) {
      const user = await userApi.getCurrentUser(event.id)
      if(state.loadedUser && state.loadedUser.fires)
        state.loadedUser=user
      return state
    }
    return state
  }
})