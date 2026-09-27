import { handleHttpError, handleHttpResponse, http } from '@shared/http';
import { IUser } from '@components/User/user.types';
import { ITeamProps } from '@components/Teams/teams.types';

const getCurrentUser = (eventId?:string): Promise<any> => {
  return http.get('/users/me',{params:eventId}).then(handleHttpResponse).catch(handleHttpError)
  // return new Promise(resolve => {
  // })
}

// const getUserGrade = (eventId:string):Promise<any> => {
//   return http.get(`/users/rate?$eventId=${eventId}`).then(handleHttpResponse).catch(handleHttpError)
// }
const rateProj = (eventId:string,projId:string):Promise<any>=>{
  return http.post(`/rate/project/${projId}`, null, {
    params: { eventId },
  }).then(handleHttpResponse).catch(handleHttpError)
}

const getFiresBalance = (eventId: string): Promise<any> => {
  return http.get('/rate/balance', {
    params: { eventId },
  }).then(handleHttpResponse).catch(handleHttpError)
}

const getAvailableEvents = ():Promise<any>=>{
  return http.get(`/events/available`).then(handleHttpResponse).catch(handleHttpError)
}

const getRoles = ():Promise<any>=>{
  return http.get('/roles').then(handleHttpResponse).catch(handleHttpError)
}
const searchUsers = (query:string):Promise<any>=>{
  return http.get('/users/search',{params:{
    query
    }}).then(handleHttpResponse).catch(handleHttpError)
}
const saveUser = (user:IUser) =>{
  return http.patch(`/users/${user.id}`,user).then(handleHttpResponse).catch(handleHttpError)

}


const userApi = { getCurrentUser,getAvailableEvents,getRoles,searchUsers,saveUser,rateProj,getFiresBalance }
export default userApi