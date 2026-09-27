import { handleHttpError, handleHttpResponse, http } from '@shared/http';

const getAllEvents = () => {
  return http.get('/events').then(handleHttpResponse).catch(handleHttpError)
}

const getCurrentEvent = () => {
  return http.get('/events?current=true').then(handleHttpResponse).catch(handleHttpError)
}

const getAllCategories = ()=>{
  return http.get('/categories').then(handleHttpResponse).catch(handleHttpError)
}

const homeApi = { getAllEvents,getCurrentEvent,getAllCategories }
export default homeApi