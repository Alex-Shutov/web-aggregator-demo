import React, { useEffect, useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@shared/Input';

import useUser from '@components/User/hooks/useUser';
import { urlPattern } from '@utils/check';
import ErrorText from '@shared/ErrorText';
import userApi from '@components/User/user.api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileChanges, StatusObject, statusObjProfileAtom } from '@components/User/components/Proifle/profile.atoms';
import { transformToNewSet } from '@utils/transfrom';



const Information: React.FC = () => {
  const { user,changeUser } = useUser()
  const [status, setStatus] = useRecoilState(statusObjProfileAtom);
  const setChanges = useSetRecoilState(profileChanges)


  const schema = yup.object({
    link: yup.string().matches(urlPattern, 'Неверное значение'),
  }).required();

  type FormData = yup.InferType<typeof schema>;


  const { register, handleSubmit, watch, getValues, formState: { errors,dirtyFields, isDirty, isValid } } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      link: user?.contacts || ''
    },
    resolver: yupResolver(schema)
  });

  const onChange = () =>{
    setStatus(StatusObject.changesMade)
    setChanges(prev=>transformToNewSet(prev,'userData'))
  }


  const onSubmit: SubmitHandler<FormData> = (data) => {
    setStatus(StatusObject.changesMade);
  };
  if(!user){
    return <></>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
      <div className="space-y-6">
        <label className="block">
          <span className="text-white text-2xl font-medium">Фамилия</span>
          <Input
            value={user?.surname}
            readonly={true}
            className={`mt-2`}
          />
        </label>
        <label className="block">
          <span className="text-white text-2xl font-medium">Имя</span>
          <Input
            value={user?.name}
            readonly={true}
            className={`mt-2`}/>
        </label>
        <label className="block">
          <span className="text-white text-2xl font-medium">Отчество</span>
          <Input
            value={user?.patronymic ?? 'Не указано'}
            readonly={true}
            className={`mt-2`}/>

        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-white text-2xl font-medium">Направление обучения</span>
          <Input
            value={user?.program}
            readonly={true}
            className={`mt-2`}/>
        </label>
        <label className="block">
          <span className="text-white text-2xl font-medium">Курс</span>
          <Input
            value={user?.level}
            readonly={true}
            className={`mt-2`}/>
        </label>
        <label className="block">
          <span className="text-white text-2xl font-medium">Академ. группа</span>
          <Input
            value={user?.group}
            readonly={true}
            className={`mt-2`}/>
        </label>
        <label className="block">
          <span className="text-white text-2xl font-medium">Контакты</span>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              value={user?.contacts}
              {...register('link')}
              readonly={false}
              placeholder="Ссылка на Telegram или ВК"
              className={`${errors.link ? 'border-red-500' : 'border-transparent'}`}
              onChange={({ currentTarget })=>{
                onChange()
                changeUser('contacts',currentTarget.value)}
              }
            />
            {!errors.link && (
              <a href={getValues().link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Открыть ссылку
              </a>
            )}
          </div>
          {errors?.link  && <ErrorText>{errors?.link.message}</ErrorText>}
        </label>
      </div>
    </form>
  );
};

export default Information;
