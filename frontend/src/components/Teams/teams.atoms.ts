import { atom } from 'recoil';
import { IUser } from '@components/User/user.types';
import { ITeamProps } from '@components/Teams/teams.types';

export const profileTeamName = atom({
  key: '/team_name_profile',
  default: '',
});

export const teamMembersState = atom<IUser[]>({
  key: '/teamMembersState',
  default: [],
});

export const teamState = atom<ITeamProps>({
  key:'/team_state',
  default:{id:'',name:'',description:'',members:[],projectRolesIds:[]}
})