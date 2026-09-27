import React from 'react';
import Selector from '@shared/Selector';
import useAvailableEvents from '@components/User/components/Proifle/hooks/useAvailableEvents';
import useRoles from '@components/User/components/Proifle/hooks/useRoles';
import { IEventStatus } from '@components/Home/home.types';
import CreateTeamBlock from '@components/User/components/Proifle/components/TeamBlock/CreateTeamBlock';
import useUser from '@components/User/hooks/useUser';
import { profileChanges, StatusObject, statusObjProfileAtom } from '@components/User/components/Proifle/profile.atoms';
import { transformToNewSet } from '@utils/transfrom';
import useTeam from '@components/Teams/hooks/useTeam';
import { useSetRecoilState } from 'recoil';
import { isDemoUser } from '@utils/isDemoUser';

interface ButtonSeasonProps {
  label: string;
  disable?: boolean;
  select: boolean;
  onClick?: () => void;
}

function ButtonSeason({ label = '', disable = false, select, onClick }: ButtonSeasonProps) {
  const color = select ? 'bg-bt_secondary' : 'bg-pnl_fourth';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center w-full sm:w-40 h-11 border ${color} border-bt_secondary transition-colors duration-100 ease-in-out font-medium text-base sm:text-lg rounded-md ${disable ? 'text-gray-400 border-gray-400 cursor-not-allowed' : ''}`}
      disabled={disable}
    >
      {label}
    </button>
  );
}

const MyProjects = () => {
  const { availableEvents, selectedEvent, handleCheck } = useAvailableEvents()
  const {team,createEmptyTeam} = useTeam()
  const {user} = useUser()
  const {roles,changeRole,currentRole} = useRoles()
  const demo = isDemoUser(user)

  const setChanges = useSetRecoilState(profileChanges)
  const  setStatus = useSetRecoilState(statusObjProfileAtom);

  const handleChangeRole = (id:string) => {
    changeRole(id)
    setStatus(StatusObject.changesMade)
    if(roles.find(el=>el.id===id)?.role ==='Team Lead') {
      if (!team) createEmptyTeam()
      setChanges(prev => transformToNewSet(prev, 'teamData'))
    }
    setChanges(prev=>transformToNewSet(prev,'userData'))
  }

  return (
    <div className="grow p-0 sm:p-2 min-w-0">
      <h2 className="mb-2 text-xl sm:text-2xl font-semibold">Выбор проектов</h2>
      <p className="mb-6 sm:mb-12 text-base sm:text-lg text-txt_secondary">выберите учебный семестр</p>
      <div className="flex gap-3 sm:gap-6 mb-8 sm:mb-12 flex-wrap">
        {availableEvents?.map((el, idx) => {
          return (
          <div key={idx} >
            <ButtonSeason
              disable={false}
              label={el.name}
              select={el?.checked ?? false}
              onClick={() => handleCheck(el.id)}
            />
          </div>
        )})}
      </div>
      {(
        <div className={'max-w-96 mb-12'}>
          <Selector
            idProp={'id'}
            prop={'role'}
            name={'roles'}
            placeholder={'Введите роль'}
            currentValue={currentRole?.role ?? ''}
            onChange={(id) => handleChangeRole(id)}
            label='Роль в команде*'
            options={roles}
          />
          <p>
            Создать команду может только <span className="text-txt_ind_secondary">Team Lead</span>
          </p>
        </div>
      )}
      {demo && (
        <p className="mb-6 text-txt_secondary text-lg">
          В демо-режиме создание проектов недоступно. Просмотр и профиль работают.
        </p>
      )}
      {!demo && selectedEvent?.status === IEventStatus.OPENED && currentRole?.role === 'Team Lead' && user &&
        (<div>
          <CreateTeamBlock currentUser={user}/>
        </div>)
      }
    </div>
  );
};

export default MyProjects;
