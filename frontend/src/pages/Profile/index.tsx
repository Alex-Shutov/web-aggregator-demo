import React from 'react';
import ProfileLayout from '@shared/Layouts/ProfileLayout';
import { Outlet } from 'react-router-dom';
import { useProfile } from '@components/User/components/Proifle/hooks/useProfile';
import useUser from '@components/User/hooks/useUser';

const Profile = () => {
  const profile = useProfile();
  const { user } = useUser()
  if(!user){
    return <></>
  }
  return (
    <ProfileLayout {...profile}>
      <Outlet/>
    </ProfileLayout>
  );
};

export default Profile;