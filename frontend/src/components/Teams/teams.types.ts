import { ICategoryProps } from '@components/Home/components/Categories/categories.types';
import { IUser } from '@components/User/user.types';

export interface ITeamProps{
  id: string;
  name:string,
  description:string,
  members: IUser[];
  projectId?:string,
  projectRolesIds:string[]
}

