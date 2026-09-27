import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import hidePasswordSvg from "@public/icons/eyes/hide_password.svg";
import showPasswordSvg from "@public/icons/eyes/show_password.svg";
import authApi from '@components/Auth/components/auth.api';
import useUser from '@components/User/hooks/useUser';
import { reconnectSocketWithAuth } from '@shared/socket';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState('');
  const { setUser } = useUser()
  const schema = yup.object().shape({
    email: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле')
  });

  type FormData = yup.InferType<typeof schema>;

  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()

  const handleLogin = async (formValue: { email: string; password: string }) => {
    authApi.handleLogin(formValue.email, formValue.password).then(async (r) => {
      if (r.status === 'success') {
        setUser(r.body.user)
        await reconnectSocketWithAuth()
        navigate('/')
      }
      else {
        setError('email', {
          type: 'server',
          message: r.message
        })
        setError('password', {
          type: 'server'
        })
      }
    })

  };

  const handleDemoLogin = async () => {
    setDemoError('')
    setDemoLoading(true)
    try {
      const r = await authApi.handleDemoLogin()
      if (r.status === 'success') {
        setUser(r.body.user)
        await reconnectSocketWithAuth()
        navigate('/')
      } else {
        setDemoError(r.message || 'Не удалось войти в демо-режим')
      }
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="text-center mb-8 sm:mb-12 font-semibold text-2xl sm:text-3xl">Вход</div>
        <label className={`block mb-10 sm:mb-16 relative ${errors.email ? "text-bt_danger" : ""}`}>
          <input
            {...register("email")}
            type="text"
            placeholder="Логин"
            className={`block w-full h-12 sm:h-14 p-4 font-light text-base sm:text-lg text-txt_main placeholder-txt_secondary bg-pnl_fourth border border-pnl_secondary rounded-md ${errors.email ? "border-bt_danger placeholder-bt_danger" : ""}`}
          />
          {(
            <p className="absolute  left-1 text-bt_danger font-normal text-base sm:text-lg leading-5">
              {errors.email?.message}
            </p>
          )}
        </label>
        <label className={`block mb-10 sm:mb-16 relative ${errors.password ? "text-bt_danger" : ""}`}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Пароль"
            autoComplete="off"
            className={`block w-full h-12 sm:h-14 p-4 font-light text-base sm:text-lg bg-pnl_fourth border border-pnl_secondary rounded-md  placeholder-txt_secondary ${errors.password ? "border-bt_danger placeholder-bt_danger" : ""}`}
          />
          <img
            alt={showPassword ? "Hide password" : "Show password"}
            src={showPassword ? hidePasswordSvg : showPasswordSvg}
            onClick={() => setShowPassword(prevState => !prevState)}
            className="absolute right-4 top-3 sm:top-4 cursor-pointer"
          />
          <p className="absolute bottom-[-1.2rem] left-1 text-bt_danger font-normal text-base sm:text-lg leading-5">
            {errors.password?.message}
          </p>
        </label>
        <button
          type="submit"
          className="w-full bg-bt_secondary hover:bg-bt_secondary_hover active:bg-bt_secondary_pressed rounded-md flex items-center justify-center font-semibold text-xl sm:text-2xl h-12 sm:h-14 my-8 sm:my-14 transition-colors duration-300"
        >
          Войти
        </button>
      </form>
      {process.env.REACT_APP_DEMO_LOGIN === 'true' && (
        <>
      <button
        type="button"
        disabled={demoLoading}
        onClick={handleDemoLogin}
        className="w-full border border-pnl_secondary hover:bg-pnl_fourth rounded-md flex items-center justify-center font-semibold text-lg sm:text-xl h-12 sm:h-14 transition-colors duration-300 disabled:opacity-60"
      >
        {demoLoading ? 'Вход…' : 'Войти в демо режим'}
      </button>
      {demoError && (
        <p className="mt-4 text-center text-bt_danger text-base sm:text-lg">{demoError}</p>
      )}
        </>
      )}
    </div>
  );
};

export default Login;
