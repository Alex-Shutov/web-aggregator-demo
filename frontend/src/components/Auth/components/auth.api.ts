import { handleHttpError, handleHttpResponse, http } from '@shared/http';

const handleLogin = (email:string,password:string) => {
  return http.post('/auth/signIn',{credentials:{
    email,password
    }}).then(handleHttpResponse).catch(handleHttpError)
}

const handleUrfuLogin = (email:string,password:string) => {
  return http.post('/auth/loginUrfu',{credentials:{
    email,password
    }}).then(handleHttpResponse).catch(handleHttpError)
}

const handleDemoLogin = () => {
  return http.post('/auth/demo').then(handleHttpResponse).catch(handleHttpError)
}

const authApi = {handleLogin, handleUrfuLogin, handleDemoLogin}
export default authApi
