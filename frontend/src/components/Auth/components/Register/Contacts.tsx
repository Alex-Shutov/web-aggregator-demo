import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { ISignUpData } from '@components/Auth/components/auth.types';

const schema = yup.object({
  name: yup.string().required('Обязательное поле'),
  surname: yup.string().required('Обязательное поле'),
  group: yup.string().required('Обязательное поле'),
}).required();

type FormData = yup.InferType<typeof schema>;
//TODO dodelat
interface IProps {
  credentials:ISignUpData,
  changeCredentials: (key: string, value: string) => void
}

const Contacts:React.FC<IProps> = ({credentials,changeCredentials}) => {
  const navigate = useNavigate();
  // const { data, setValues } = useData();

  const { register, handleSubmit, watch, formState: { errors, dirtyFields } } = useForm<FormData>({
    defaultValues: {
      name: credentials.name,
      surname: credentials.surname,
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (currentData: FormData) => {
    // setValues(currentData);
    // api.signUp({
    //   credentials: data
    // }).then(() => {
    //   navigate('/')
    // });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
      <div className="relative mb-6">
        <input
          {...register("name")}
          type="text"
          placeholder="Имя"
          className={`block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary ${errors.name ? "border-bt_danger placeholder-bt_danger" : ""}`}
        />
        {dirtyFields?.name && !errors.name ? (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            Введите свое имя
          </p>
        ) : (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="relative mb-6">
        <input
          {...register("surname")}
          type="text"
          placeholder="Фамилия"
          className={`block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary ${errors.surname ? "border-bt_danger placeholder-bt_danger" : ""}`}
        />
        {dirtyFields?.surname && !errors.surname ? (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            Введите свою фамилию
          </p>
        ) : (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            {errors.surname?.message}
          </p>
        )}
      </div>
      <div className="relative mb-6">
        <input
          {...register("group")}
          type="text"
          placeholder="Академ. группа"
          className={`block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary ${errors.group ? "border-bt_danger placeholder-bt_danger" : ""}`}
        />
        {dirtyFields?.group && !errors.group ? (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            Введите академическую группу
          </p>
        ) : (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            {errors.group?.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-bt_secondary hover:bg-bt_secondary_hover active:bg-bt_secondary_pressed rounded-md flex items-center justify-center font-semibold text-2xl h-14 transition-colors duration-300"
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

export default Contacts;
