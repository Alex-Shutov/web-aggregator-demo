import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { getToken } from '@shared/http';
import userApi from '@components/User/user.api';
import { authedAtom as userAtom } from '@components/User/user.atom';
import Main from '@components/Main/components';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthProvider = (props:PropsWithChildren) => {
  const [authUser,setAuthUser] = useRecoilState(userAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const resetAuthUser = useResetRecoilState(userAtom)
  useEffect(() => {
    setAuthUser((currVal)=>({...currVal,isLoading:true}))

    getToken().then((token) => {
      if (token) {
        userApi.getCurrentUser().then((r) => {
          if(r.status === 'success' && r.body) {
            setAuthUser((currVal) => ({ ...currVal, ...{ isLoading: false, loadedUser: r.body.user } }))
            if(location.pathname.includes('/auth')){
              navigate('/')
            }
          }
          else
            setAuthUser({loadedUser:null,authStage:'failed',isLoading:false})
        })
      } else {
        localStorage.clear()
        resetAuthUser()
      }
    }).then(()=>setAuthUser((currVal)=> ({...currVal,isLoading:false})))

  }, [ resetAuthUser, setAuthUser])

  if (authUser.authStage === 'logged_out') return <>{props.children}</>
  if (authUser.authStage === 'unknown' || !authUser.loadedUser?.id) {
    return <>{props.children}</>
  }

  return <>{props.children}</>
};

export default AuthProvider;