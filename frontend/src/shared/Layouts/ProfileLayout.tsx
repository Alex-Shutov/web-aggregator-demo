import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import exitSvg from '@public/icons/exit.svg';
import PublicationNotice from '@shared/PublicationNotice';
import { SetterOrUpdater } from 'recoil';
import Button from '@shared/Button';

interface IProps {
  label: string,
  buttonLink: string[],
  status:any,
  subSubmitText: string,
  setSubSubmitText: SetterOrUpdater<string>,
  button: any,
  saveButtonHandler: () => void
}

const ProfileLayout: React.FC<IProps> = ({
                                           label,
                                           buttonLink,
                                           status,
                                           subSubmitText,
                                           button,
                                           saveButtonHandler,
                                         }) => {
  return (
    <div className="mx-auto mb-16 sm:mb-28 max-w-screen-xl px-4 sm:px-8 overflow-x-hidden">
      <div className="mb-2 text-2xl sm:text-3xl font-semibold text-txt_main">{label}</div>
      <div className="mb-8 sm:mb-16 text-xl sm:text-2xl text-txt_secondary">Профиль</div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between">
        <div className={'flex-initial w-full lg:w-64 shrink-0'}>
          <h2 className={'mb-2'}>Редактирование</h2>
          <PublicationNotice className={`text-lg sm:text-xl ${status[1]}`}>
            {status[0]}
          </PublicationNotice>
          <nav className="mb-6 sm:mb-10 p-6 sm:p-10 bg-pnl_secondary">
            <ul className="flex flex-row lg:flex-col gap-4 lg:gap-0 overflow-x-auto">
              <li className="mb-0 lg:mb-4 shrink-0">
                <NavLink
                  to={'my-projects'}
                  className={({ isActive }) => (isActive ? 'text-txt_main text-lg' : ' text-lg text-txt_secondary hover:text-txt_main')}
                >
                  Мои проекты
                </NavLink>
              </li>
              <li className="mb-0 lg:mb-4 shrink-0">
                <NavLink
                  to={'information'}
                  className={({ isActive }) => (isActive ? 'text-txt_main text-lg' : 'text-lg text-txt_secondary hover:text-txt_main')}
                >
                  Данные пользователя
                </NavLink>
              </li>
            </ul>
            <button type="button" className="mt-8 lg:mt-20 flex items-center gap-2 text-txt_ind_info">
              <img src={exitSvg} alt="Выход" className="w-8 h-8" />
              Выход
            </button>
          </nav>
          {buttonLink.length > 0 && (
            <Button type={'bt_primary'} to={buttonLink[1]}>{buttonLink[0]}</Button>
          )}
          {button && (
            <Button onClick={saveButtonHandler} classNameContainer={'!block'} classNameButton={'w-full h-14 sm:h-16 font-semibold text-lg sm:text-xl flex items-center justify-center rounded-md transition-colors duration-300'} type={button.type} to={button.to} disabled={button?.disabled}>{button.children}</Button>
          )}
          {subSubmitText && (
            <div className="mt-4 text-sm font-medium text-txt_secondary">
              {subSubmitText}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
