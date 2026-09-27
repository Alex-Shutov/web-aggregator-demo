// recoil/atoms.ts
import { atom } from 'recoil';
import { IEvent } from '@components/Home/home.types';
import { IRole } from '@components/User/components/Proifle/types/IRole.types';
import { IUser } from '@components/User/user.types';

export const StatusObject = {
  noChanges: ['Изменений нет', '#47BDFF'],
  changesMade: ['Внесены изменения', '#FBFF47'],
  changesSave: ['Изменения сохранены', '#47FFA7'],
};

export const labelState = atom<string>({
  key: 'labelState',
  default: 'Данные пользователя',
});

export const buttonVisibleState = atom<boolean>({
  key: 'buttonVisibleState',
  default: false,
});

export const buttonLinkState = atom<string[]>({
  key: 'buttonLinkState',
  default: [],
});


export const subSubmitTextState = atom<string>({
  key: 'subSubmitTextState',
  default: '',
});

export const projectStatusState = atom<string>({
  key: 'projectStatusState',
  default: 'choose',
});

export const buttonState = atom({
  key: 'buttonState',
  default: {
    submit:true,
    disabled:true,
    children: 'Нет изменений',
    type:'bt_disabled',
    to:''
  },
});

export const eventsAvailableAtom = atom<IEvent[]>({
  key: '/available_events',
  default: [],
});


export const projectRolesAtom = atom<IRole[]>({
  key: '/project_roles',
  default: [],
});



export const statusObjProfileAtom = atom<any>({
  key: '/status_obj_profile',
  default: StatusObject.noChanges,
});

export const profileChanges = atom<Set<("userData"|"teamData"|"projectData")>>({
  key:'/profile_changes',
  default:new Set()
})