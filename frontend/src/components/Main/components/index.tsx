import MainLayout from '@shared/Layouts/MainLayout';
import React from 'react';
import HeaderLink from '@shared/Header/Link';
import { useRecoilValue } from 'recoil';
import { authedAtom as userAtom } from '@components/User/user.atom';
import ProfileDropdown from 'src/components/User/components/Proifle/components/Dropdown';
import HeaderInner from '@shared/Header/HeaderInner';

const Main = () => {
  return (
      <MainLayout>
        <HeaderInner/>
        {/*<HeaderLink path={'/to1'} label={'Витрина проектов'} className={'mr-8'}/>*/}
        {/*<HeaderLink path={'/to1'} label={'Защиты проектов'} className={'mr-8'}/>*/}
        {/*<HeaderLink path={'/to1'} label={'Заказать проект'} className={'mr-8'}/>*/}
        {/*<MainLayout/>*/}
      </MainLayout>
  );
};

export default Main;