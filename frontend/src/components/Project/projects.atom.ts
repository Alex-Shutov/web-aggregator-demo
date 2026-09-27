import { atom } from 'recoil';
import { IProjectProps } from '@components/Project/projects.types';

export interface IProjectList{
  page:number
  projects:IProjectProps[]
  totalCount:number
}

export const allProjectsList = atom<IProjectList>({
  key:'/projects',
  default:{page:1,projects:[],totalCount:0}
})

export const getCurrentProjectAtom = atom<IProjectProps|null>({
  key:'/project',
  default:null
})

export const currentProjId = atom<string>({
  key:'/project_id',
  default:''
})



