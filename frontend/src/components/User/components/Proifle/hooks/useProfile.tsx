import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  labelState,
  buttonVisibleState,
  buttonLinkState,
  subSubmitTextState,
  projectStatusState,
  buttonState, statusObjProfileAtom, profileChanges,
} from '../profile.atoms';
import userApi from '@components/User/user.api';
import { authedAtom as userAtom } from '@components/User/user.atom';
import teamApi from '@components/Teams/teams.api';
import { changeProfileSubmitButton } from '@components/User/components/Proifle/profile.selector';
import useTeam from '@components/Teams/hooks/useTeam';
import useAvailableEvents from '@components/User/components/Proifle/hooks/useAvailableEvents';
import projectApi from '@components/Project/projects.api';
import { handleSubmit } from '@utils/snackbar';
import { isDemoUser } from '@utils/isDemoUser';
import {
  currentProjId,
  getCurrentProjectAtom,
} from '@components/Project/projects.atom';

export const useProfile = () => {
  const navigate = useNavigate();
  const [label, setLabel] = useRecoilState(labelState);
  const { selectedEvent } = useAvailableEvents();
  const [buttonVisible, setButtonVisible] = useRecoilState(buttonVisibleState);
  const [buttonLink, setButtonLink] = useRecoilState(buttonLinkState);
  const [status, setStatus] = useRecoilState(statusObjProfileAtom);
  const [subSubmitText, setSubSubmitText] = useRecoilState(subSubmitTextState);
  const [projectStatus, setProjectStatus] = useRecoilState(projectStatusState);
  const button = useRecoilValue(changeProfileSubmitButton);
  const [changes, setChanges] = useRecoilState(profileChanges);
  const resetProfileChanges = useResetRecoilState(profileChanges);
  const resetButtonChanges = useResetRecoilState(buttonState);
  const resetStatus = useResetRecoilState(statusObjProfileAtom);
  const [user, setAuthUser] = useRecoilState(userAtom);
  const { team, setTeam } = useTeam();
  const [, setProject] = useRecoilState(getCurrentProjectAtom);
  const [, setCurrentId] = useRecoilState(currentProjId);

  const saveButtonHandler = async () => {
    if (button?.action === 'createProject') {
      if (isDemoUser(user?.loadedUser)) {
        handleSubmit('Создание проекта недоступно в демо-режиме');
        return;
      }
      if (!selectedEvent?.id || !team?.id) {
        handleSubmit('Выберите семестр и сохраните команду');
        return;
      }
      const resp = await projectApi.createProject(selectedEvent.id, team.id);
      if (resp.status === 'success' && resp.body?.project?.id) {
        const created = resp.body.project;
        setProject(created);
        setCurrentId(created.id);
        setTeam({ ...team, projectId: created.id });
        navigate(`/project/${created.id}/edit`);
        return;
      }
      handleSubmit(resp.body?.message || 'Не удалось создать проект');
      return;
    }

    if (button?.submit) {
      if (changes.has('userData')) {
        user?.loadedUser
          && userApi.saveUser(user?.loadedUser)
            .then(el => {
              if (el.status === 'success')
                setAuthUser((prev) => ({ ...prev, loadedUser: el.body.user }));
            });
      }
      if (changes.has('teamData') && team && selectedEvent) {
        teamApi.saveOrUpdateCommand(team, selectedEvent.id).then((el) => el.status === 'success' && setTeam(el.body));
      }
      resetProfileChanges();
      resetButtonChanges();
      resetStatus();
    }
  };

  return {
    label,
    setLabel,
    buttonVisible,
    setButtonVisible,
    buttonLink,
    setButtonLink,
    status,
    setStatus,
    subSubmitText,
    setSubSubmitText,
    projectStatus,
    setProjectStatus,
    button,
    saveButtonHandler,
    setChanges,
  };
};
