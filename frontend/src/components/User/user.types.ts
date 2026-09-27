import { IRole } from '@components/User/components/Proifle/types/IRole.types';

export interface IUser{
  projectIds?:string[],
  id:string,
  email:string,
  name:string,
  surname:string,
  patronymic?:string
  group:string,
  fires:number
  token?:string,
  program:string,
  projectRoles:IRole|undefined,
  level:string,
  contacts:string,
  role?: string,
  isDemo?: boolean,
}