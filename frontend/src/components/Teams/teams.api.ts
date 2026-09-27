import { ITeamProps } from '@components/Teams/teams.types';
import { handleHttpError, handleHttpResponse, http } from '@shared/http';

const saveOrUpdateCommand = (command:ITeamProps,eventId:string,) =>{
  const teamToDto = {
    name:command.name,
    memberIds:command.members.map(el=>[el.id,el?.projectRoles?.role]),
    eventId:eventId,
  }
  if(!command?.id)
    return http.post('/teams',teamToDto).then(handleHttpResponse).catch(handleHttpError)
  else
    return http.patch(`/teams/${command.id}`,teamToDto).then(handleHttpResponse).catch(handleHttpError)
}
const getTeam = (eventId:string) => {
  return http.get('/teams',{params:{eventId:eventId,withUser:true}}).then(handleHttpResponse).catch(handleHttpError)
}

const teamApi = {saveOrUpdateCommand,getTeam}
export default  teamApi