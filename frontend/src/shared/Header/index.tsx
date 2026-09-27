import React from 'react';
import { Link } from 'react-router-dom';
import HeaderLink from './Link';
import HamburgerButton from './HamburgerButton';
import logo from '@public/icons/logo.svg'
import { useRecoilState } from 'recoil';
import menuAtom from '../../components/Menu/menu.atom';

interface IProps{
  after?:React.ReactNode
  children:React.ReactNode
}
const Header:React.FC<IProps> = ({children,after}) => {
  const [state, setMenuOpen] = useRecoilState(menuAtom)

  const closeMenu = () => setMenuOpen({ isMenuOpen: false })

  return (
    <div className={'sticky top-0 z-40 mb-8 sm:mb-12 lg:mb-16 bg-pnl_secondary'}>
      <div className="bg-pnl_add_first border-b border-pnl_add_first_border px-4 py-2 text-center text-sm sm:text-base leading-snug text-txt_main">
        Демонстрационный стенд. Тестовые данные, бизнес-логика упрощена и не соответствует продукту заказчика.
      </div>
      <div className="flex items-center justify-between mx-auto max-w-screen-xl px-4 sm:px-6 py-3 sm:py-4 gap-3">
        <div className={'lg:hidden shrink-0'}>
          <HamburgerButton/>
        </div>
        <Link to="/" className="shrink-0" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="h-8 sm:h-auto transition-transform hover:scale-105" />
        </Link>
        <ul className="hidden lg:flex lg:flex-row lg:relative lg:m-0 lg:list-none">
          {children}
        </ul>
        <div className="min-w-0 shrink">
          {after}
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-pnl_third border-t border-pnl_fourth ${
          state.isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-3 gap-1" onClick={closeMenu}>
          {children}
        </ul>
      </div>
    </div>
  );
};

export default Header;
