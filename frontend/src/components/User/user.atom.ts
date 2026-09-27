import { atom } from 'recoil';
import { getToken } from '@shared/http';
import { IUser } from '@components/User/user.types';

interface IMainState{
  isLoading:boolean
  loadedUser:IUser|null
  authStage:"logged"|"logged_out"|"unknown"|"failed"
}

interface IRatesUser{
  grades:[]
  user:any
}

export const authedAtom = atom<IMainState>({
  key:'/user',
  default:{isLoading:false,loadedUser:null,authStage:'logged_out'}
})

export const userRatesAtom = atom<IRatesUser>({
  key:'/rates/user',
  default:{grades:[],user:null}
})


