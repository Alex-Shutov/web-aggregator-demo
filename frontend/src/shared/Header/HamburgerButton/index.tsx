import React, { useContext, useState } from 'react';
import { useRecoilState } from 'recoil';
import menuAtom from '../../../components/Menu/menu.atom';

const HamburgerButton: React.FC = () => {
  const [state,setMenuOpen] = useRecoilState(menuAtom)
  const clickHandler = () => {
    const newState = !state.isMenuOpen
    setMenuOpen({isMenuOpen:newState});
  };

  return (
    <div className=" w-12 h-[1.3rem] flex justify-between flex-col" onClick={clickHandler} aria-label="Открыть главное меню">
      <span className={`w-8 h-[0.2rem] bg-txt_main ${state.isMenuOpen ? 'rotate-45 translate-y-2 opacity' : ''} transition-transform duration-300`} />
      <span className={`w-8 h-[0.2rem] bg-txt_main ${state.isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
      <span className={`w-8 h-[0.2rem] bg-txt_main ${state.isMenuOpen ? '-rotate-45 -translate-y-2 opacity' : ''} transition-transform duration-300`} />
    </div>
  );
};

export default HamburgerButton;
