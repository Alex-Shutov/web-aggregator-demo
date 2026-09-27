import { selector } from 'recoil';
import { buttonState, profileChanges } from '@components/User/components/Proifle/profile.atoms';
import { teamState } from '@components/Teams/teams.atoms';
import { authedAtom as userAtom } from '@components/User/user.atom';
import { locationState } from '@/App';

export const changeProfileSubmitButton = selector({
  key: '/change_profile_button',
  get: ({ get }) => {
    const changes = get(profileChanges);
    const currentButton = get(buttonState);
    const user = get(userAtom);
    const team = get(teamState);
    const newButtonState = { ...currentButton, action: undefined as string | undefined, to: '' };
    const location = get(locationState);

    if (changes.size) {
      newButtonState.children = 'Сохранить';
      newButtonState.disabled = false;
      newButtonState.type = 'bt_primary';
      newButtonState.submit = true;
      return newButtonState;
    }

    if (!changes.size && !team.id) {
      newButtonState.children = 'Нет изменений';
      newButtonState.disabled = true;
      newButtonState.type = 'bg_disabled';
      newButtonState.submit = true;
      return newButtonState;
    }

    if (!changes.size && team.id && !team?.projectId && location.includes('my-projects') && user?.loadedUser?.projectRoles?.role === 'Team Lead') {
      newButtonState.children = 'Создать проект';
      newButtonState.submit = false;
      newButtonState.disabled = false;
      newButtonState.type = 'bt_secondary';
      newButtonState.action = 'createProject';
      newButtonState.to = '';
      return newButtonState;
    }

    if (!changes.size && team.id && team.projectId && location.includes('my-projects') && user?.loadedUser?.projectRoles?.role === 'Team Lead') {
      newButtonState.children = 'Редактировать проект';
      newButtonState.submit = false;
      newButtonState.disabled = false;
      newButtonState.type = 'bt_secondary';
      newButtonState.to = `/project/${team.projectId}/edit`;
      return newButtonState;
    }

    return newButtonState;
  }
})
