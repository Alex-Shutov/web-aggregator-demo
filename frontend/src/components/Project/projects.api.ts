import { handleHttpError, handleHttpResponse, http } from '@shared/http';
import { SortOrder } from '@components/Home/components/SelectionProjects/Pagination/pagination.atom';
import { IProjectProps, PROJECT_STATUSES } from '@components/Project/projects.types';

const getAllProject = () => {
  return http.get('/projects').then(handleHttpResponse).catch(handleHttpError)
}
const getProject = (id:string) => {
  return http.get(`/project/${id}`).then(handleHttpResponse).catch(handleHttpError)
}

const getProjectsByEvent = (eventId:string,categoriesIds:string[],page:number,limit:number,sortType?:SortOrder)=>{
  return http.get(`/projects/${eventId}`,{params:{
      categoriesIds:categoriesIds,
      page:page,
      limit:limit,
      sortType:sortType
    }}).then(handleHttpResponse).catch(handleHttpError)
}

const getProjectByTeamAndEvent = (eventId:string,teamId:string)=>{
  return http.get('/projectByEventTeam',{params:{
    eventId,teamId
    }})
}

const createProject = (eventId:string,teamId?:string) =>{
  return http.post(`/project/create/${eventId}`,{teamId}).then(handleHttpResponse).catch(handleHttpError)
}
const updateProject = (updatedProject:IProjectProps) => {
  return http.patch(`/project/${updatedProject.id}`,updatedProject).then(handleHttpResponse).catch(handleHttpError)

}

const publicProj = (proj:IProjectProps) => {
  return http.patch(`/project/${proj.id}`,{...proj,status:PROJECT_STATUSES.APPROVED}).then(handleHttpResponse).catch(handleHttpError)

}

const uploadProjectFiles = (projectId: string, files: {
  zip?: File | null
  images?: File[]
  mainImage?: File | null
  video?: File | null
}) => {
  const formData = new FormData()
  if (files.zip) formData.append('zip', files.zip)
  if (files.mainImage) formData.append('mainImage', files.mainImage)
  if (files.video) formData.append('video', files.video)
  files.images?.forEach((image) => formData.append('images', image))
  return http.post(`/minio/uploadFiles/${projectId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(handleHttpResponse).catch(handleHttpError)
}

const projectApi = {getAllProject,getProject,getProjectsByEvent,createProject,updateProject,getProjectByTeamAndEvent,publicProj,uploadProjectFiles }
export default projectApi