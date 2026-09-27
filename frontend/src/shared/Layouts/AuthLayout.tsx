import React from "react";
import { Outlet } from "react-router-dom";
import HeaderInner from '@shared/Header/HeaderInner';

function Auth() {
  return (
    <div className="min-h-screen flex flex-col bg-pnl_first">
      <HeaderInner />
      <div className="flex-1 px-4 py-6 sm:p-8 flex flex-col items-center justify-center bg-pnl_first">
        <div className="p-6 sm:p-10 md:p-16 lg:p-24 w-full max-w-[54.2rem] mx-auto mb-8 sm:mb-16 bg-pnl_third rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Auth
