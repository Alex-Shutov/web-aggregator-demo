import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';


const RegisterLayout = () => {

  return (
    <div className="w-full">
      <div className="text-center mb-12 font-semibold text-3xl">Регистрация</div>
      <Outlet/>
      <div className="font-medium text-lg text-center mt-12">
        <Link to='/auth/login' className="text-bt_secondary hover:text-txt_main transition-colors duration-300">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default RegisterLayout;
