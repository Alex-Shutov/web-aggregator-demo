import { selector } from 'recoil';
import { IUser } from '@components/User/user.types';
import { teamMembersState } from '@components/Teams/teams.atoms';

export const teamMembersSelector = selector<IUser[]>({
  key: 'teamMembersSelector',
  get: ({ get }) => {
    return get(teamMembersState);
  },
  set: ({ set, get }, newValue) => {
    const currentMembers = get(teamMembersState);
    set(teamMembersState, [...currentMembers, ...newValue as []]);
  },
});