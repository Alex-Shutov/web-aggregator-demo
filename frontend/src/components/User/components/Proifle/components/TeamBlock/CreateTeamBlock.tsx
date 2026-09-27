import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import Input from '@shared/Input';
import SearchSelectAsync from '@shared/SearchSelect/Async';
import { IUser } from '@components/User/user.types';
import userApi from '@components/User/user.api';
import Button from '@shared/Button';
import { profileTeamName, teamMembersState } from '@components/Teams/teams.atoms';
import { checkIsUserCreated } from '@utils/check';
import useTeam from '@components/Teams/hooks/useTeam';
import { profileChanges, StatusObject, statusObjProfileAtom } from '@components/User/components/Proifle/profile.atoms';
import { transformToNewSet } from '@utils/transfrom';

const schema = yup.object({
  TeamName: yup.string().required("Обязательное поле"),
}).required();

const limit = 7

type FormData = yup.InferType<typeof schema>;

const CreateTeamBlock = ({ currentUser }: { currentUser: IUser }) => {

  const {team,setTeam} = useTeam()
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormData>({
    mode: "all",
    defaultValues: { TeamName: team?.name },
    resolver: yupResolver(schema),
  });

  const setChanges = useSetRecoilState(profileChanges)
  const  setStatus = useSetRecoilState(statusObjProfileAtom);

  const teamMEmbersIds = useMemo(()=>team?.members?.map(el=>el.id),[team?.members])
  useEffect(() => {
    setTeam((prev)=>prev && ({ ...prev,members:[currentUser]}));
  }, [currentUser]);

  const onSubmit = () => {
    // Handle form submission
  };

  const searchUsers = async (query: string): Promise<IUser[]> => {
    // Implement API call to search users by query
    const response = await userApi.searchUsers(query);

    if (response.status !== 'success') {
      return [];
    }

    const filteredUsers = response.body.filter((user: IUser) => !teamMEmbersIds?.includes(user.id));

    return filteredUsers;
  };

  const renderOption = (user: IUser) => `${user.surname??' '} ${user?.name??' '} ${user?.patronymic ?? ''}`;

  const addComponent = (user: IUser | null) => {
    if (team && team?.members?.length < limit && user) {
      setTeam((prev)=>prev && ({...prev,members:[...prev.members,user]}));
    }
  };

  const changeComponent = (user: IUser, index: number) => {
    const updatedTeamMembers = team?.members.map((member, i) => (i === index ? user : member)) ?? [];
    setStatus(StatusObject.changesMade)
    setChanges(prev => transformToNewSet(prev, 'teamData'))
    setTeam((prev)=>({...prev,members:updatedTeamMembers}));

  };



  const deleteElement = (id: string) => {
    setTeam((prev)=>prev && ({...prev,members:prev.members.filter((member:IUser) => member.id !== id)}))
  };


  const teamMembersJsx = useMemo(()=>{
    return  team?.members?.filter(el=>el.id!==currentUser.id)?.map((member:IUser,index) => (
        <li className="mb-6">
          <div className="flex  items-center justify-between mb-2.5">
            <label className="block text-gray-300  font-semibold ">Участник команды #{index+2}</label>
            <Button classNameButton={'h-6 w-12 !font-light !text-sm'} onClick={()=>deleteElement(member.id)} type={'bt_danger_outline'}>Удалить</Button>
          </div>
          <SearchSelectAsync
            key={member.id}

            selectStyle={'w-full'}
            // label={`Участник команды #index+2}`}
            currentValue={checkIsUserCreated(member) ? renderOption(member) : ''}
            placeholder="Поиск участника"
            name="userSearch"
            searchItems={searchUsers}
            renderOption={renderOption}
            onChange={(item)=>{
              changeComponent(item,index+1)}
            }
          />
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Роль: {member?.projectRoles?.role ?? 'Не указана'}</span>
            <a href="#" className="text-blue-300 underline">Контакты</a>
          </div>
        </li>
      ))
  },[team?.members,changeComponent,deleteElement])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <label className="block text-gray-300 text-2xl font-semibold mb-1">Название команды</label>
        <Input
          value={team?.name}
          {...register("TeamName")}
          onChange={({ currentTarget }) => {
            setStatus(StatusObject.changesMade)
            setChanges(prev => transformToNewSet(prev, 'teamData'))

            setTeam((prev)=>prev && ({...prev,name:currentTarget.value}))}
        }
        />
      </div>
      <div>
        <label className="block text-gray-300 font-semibold mb-2">Участник команды #1</label>
        <Input
          readonly={true}
          value={`${currentUser.surname} ${currentUser.name} ${currentUser.patronymic ?? ''}`}
          className="w-full py-2 bg-gray-800 border border-gray-600 rounded-md"
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-300">Роль: {currentUser.projectRoles?.role}</span>
        <a href="#" className="text-blue-300 underline">Контакты</a>
      </div>
      <ul>
        {team?.id  ? teamMembersJsx : ( team?.members?.filter(el=>el.id!==currentUser.id)?.map((member:IUser,index) => (
          <>
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Участник команды #{index+2}</label>
              <Input
                readonly={true}
                value={`${member.surname} ${member.name} ${member.patronymic ?? ''}`}
                className="w-full py-2 bg-gray-800 border border-gray-600 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-300">Роль: {member.projectRoles?.role}</span>
              <a href="#" className="text-blue-300 underline">Контакты</a>
            </div>
          </>
        )))}
      </ul>

      <button disabled={team?.members?.length === limit} type="button" onClick={() => addComponent({
        id: team?.members?.length.toString() ?? '0',
        email: '',
        surname: '',
        name: '',
        group: '',
        fires: -1,
        program: '',
        projectRoles: undefined,
        level: '',
        contacts: ''
      })}
              className="w-full py-2.5 bg-gray-700 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white">
        Добавить участника {team?.members?.length ?? 1}/{limit}
      </button>
    </form>
  );
};

export default CreateTeamBlock;
