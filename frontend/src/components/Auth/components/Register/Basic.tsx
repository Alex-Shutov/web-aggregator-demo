import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import hidePasswordSvg from "@public/icons/eyes/hide_password.svg";
import showPasswordSvg from "@public/icons/eyes/show_password.svg";
import useSignUpCredentials from '@components/Auth/components/Register/hooks/useSignUpCredentials';
import { ISignUpData } from '@components/Auth/components/auth.types';


const schema = yup.object({
  email: yup.string().required('Обязательное поле').email('Неверное значение'),
  password: yup.string().required('Обязательное поле').min(8, 'Минимум 8 символов'),
  confirmPassword: yup.string().required('Обязательное поле').oneOf([yup.ref('password')], 'Пароли не совпадают')
}).required();

type FormData = yup.InferType<typeof schema>;

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  credentials:ISignUpData,
  changeCredentials: (key: string, value: string) => void
}

const Basic: React.FC<IProps> = ({ setStep,credentials,changeCredentials }) => {
  const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm<FormData>({
    // defaultValues: {
    //   email: data.email,
    //   password: data.password,
    //   confirmPassword: data.password
    // },
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => {
    setStep(2);

  }

  useEffect(() => {
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="space-y-6">
      <div className={`relative mb-16 ${errors.email ? "text-bt_danger" : ""}`}>
        <input
          {...register("email")}
          type="email"
          placeholder="Почта от ЛК УрФУ"
          className={`block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary ${errors.email ? "border-bt_danger placeholder-bt_danger" : ""}`}
        />
        {dirtyFields?.email && !errors.email ? (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            Введите почту УрФУ
          </p>
        ) : (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className={`relative mb-16 ${errors.password ? "text-bt_danger" : ""}`}>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Пароль"
          autoComplete="off"
          className={`block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary ${errors.password ? "border-bt_danger placeholder-bt_danger" : ""}`}
        />
        <img
          alt={showPassword ? "Hide password" : "Show password"}
          src={showPassword ? hidePasswordSvg : showPasswordSvg}
          onClick={() => setShowPassword(prevState => !prevState)}
          className="absolute right-4 top-4 cursor-pointer w-7 h-7"
        />
        {dirtyFields?.password && !errors.password ? (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            Введите не менее 8 символов
          </p>
        ) : (
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
            {errors.password?.message}
          </p>
        )}
      </div>
      <div className={`relative mb-16 ${errors.confirmPassword ? "text-bt_danger" : ""}`}>
        <input
          type={showPasswordConfirm ? "text" : "password"}
          {...register("confirmPassword")}
          placeholder="Подтвердите пароль"
          autoComplete="off"
          className={`block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary ${errors.confirmPassword ? "border-bt_danger placeholder-bt_danger" : ""}`}
        />
        <img
          alt={showPasswordConfirm ? "Hide password" : "Show password"}
          src={showPasswordConfirm ? hidePasswordSvg : showPasswordSvg}
          onClick={() => setShowPasswordConfirm(prevState => !prevState)}
          className="absolute right-4 top-4 cursor-pointer w-7 h-7"
        />
        <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-lg leading-5">
          {errors.confirmPassword?.message}
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-bt_secondary hover:bg-bt_secondary_hover active:bg-bt_secondary_pressed rounded-md flex items-center justify-center font-semibold text-2xl h-14 transition-colors duration-300"
      >
        Далее
      </button>
    </form>
  );
}

export default Basic;
