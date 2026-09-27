import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentCredentialsValues } from '@components/Auth/components/auth.atoms';

const UseSignUpCredentials = () => {
  const [currentCredentials,setCurrentCredentials] = useRecoilState(currentCredentialsValues)
  const resetCurrentCreds = useResetRecoilState(currentCredentialsValues)
  const handleChangeCreds = (key:string,value:string) => {
    if(key in currentCredentials){
      setCurrentCredentials(prev=>({...prev,[key]:value}))
    }
  }

  const handleResetCreds = () => resetCurrentCreds()

  return {credentials:currentCredentials,changeCredentials:handleChangeCreds,resetCredentials:handleResetCreds}
};

export default UseSignUpCredentials;