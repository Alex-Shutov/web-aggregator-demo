import { ICategoryProps, IProjectCategoryProps } from '@components/Home/components/Categories/categories.types';
import { ITeamProps } from '@components/Teams/teams.types';

export interface IProjectProps{
  genre:string
  id: string;
  name:string,
  description:string,
  howToPlay: string;
  gitLink: string;
  rating: number;
  event:string
  team: ITeamProps;
  status:PROJECT_STATUSES

  categoryId:string

  categories:IProjectCategoryProps[]
}

export enum PROJECT_STATUSES {
  DRAFT='draft',
  CHECK='check',
  APPROVED='approved',
  DECLINED='declined'
}

export interface IProjectWithFunctions extends IProjectProps {
  updateProjectState:(updatedProject: IProjectProps) => void;
  initializeProject: () => Promise<void>;
  updateProject: () => void;
  publicProject:()=>void;
}
