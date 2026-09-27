import { atom } from 'recoil';
import { IEvent } from '@components/Home/home.types';
import { ISignUpData } from '@components/Auth/components/auth.types';

export const currentCredentialsValues = atom<ISignUpData>({
  key:'/crdentials',
  default:{
    email:'',
    password:'',
    name:'',
    surname:''
  }
})