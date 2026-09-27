import React, { useCallback } from 'react';
import ProfileDropdown from 'src/components/User/components/Proifle/components/Dropdown';
import HeaderLink from '@shared/Header/Link';
import Header from '@shared/Header';
import { removeToken } from '@shared/http';
import { useNavigate } from 'react-router-dom';
import useUser from '@components/User/hooks/useUser';

const HeaderInner = () => {
  const { user } = useUser()
  const navigator = useNavigate()
  const handleLogout = useCallback(async ()=>{
    await removeToken()
    window.location.reload()
    navigator('/')
  },[navigator])
  return (
    <Header
      after={<ProfileDropdown handleLogout={handleLogout} user={user}/>}
    >
      <HeaderLink path={'/'} label={'Витрина проектов'} className={'lg:mr-8'}/>
      <HeaderLink path={'/profile/my-projects'} label={'Мои проекты'} className={'lg:mr-8'}/>
      <HeaderLink path={'/profile/information'} label={'Профиль'} className={'lg:mr-8'}/>
    </Header>
  );
};

export default HeaderInner;
