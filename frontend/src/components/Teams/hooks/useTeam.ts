import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { teamMembersState, teamState } from '@components/Teams/teams.atoms';
import teamApi from '@components/Teams/teams.api';
import useAvailableEvents from '@components/User/components/Proifle/hooks/useAvailableEvents';
import { ITeamProps } from '@components/Teams/teams.types';
import { checkIsGuid } from '@utils/check';

const  useTeam = () => {
  const [team, setTeam] = useRecoilState(teamState);
  const { selectedEvent } = useAvailableEvents();

  useEffect(() => {
    if(team && checkIsGuid(team?.id)) return
    async function fetchTeam() {
      if (selectedEvent) {
        const response = await teamApi.getTeam(selectedEvent.id);
        return response
      }
    }

    fetchTeam().then(response=>{
      if (response?.status === 'success' ) {
        setTeam(response.body);
      }
    });

  }, [selectedEvent, setTeam]);

  const createEmptyTeam =  () => {
    if (selectedEvent && !team) {
      const newTeam:ITeamProps = {
        id:'',
        name: '',
        members: [],
        description: '',
        projectRolesIds: [],
      };
        setTeam(newTeam);
    }
  };


  return { team:team ? team : null, setTeam,createEmptyTeam };
};


export default useTeam;