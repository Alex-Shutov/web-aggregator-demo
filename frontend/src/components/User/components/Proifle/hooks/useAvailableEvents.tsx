import React, { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentEventAtom } from '@components/Home/home.atoms';
import { eventsAvailableAtom } from '@components/User/components/Proifle/profile.atoms';
import userApi from '@components/User/user.api';
import useEvents from '@components/Home/components/EventsFilter/hooks/useEvents';
import { IEvent } from '@components/Home/home.types';

const UseAvailableEvents = () => {
  const {currentEvent} = useEvents()
  const [availableEvents,setAvailableEvents] = useRecoilState(eventsAvailableAtom)
  const handleCheck = (id:string,events?:IEvent[])=>{
    const eventsForMap = availableEvents.length ? availableEvents : events
    setAvailableEvents(eventsForMap!.map(el=>({...el,checked:id===el.id})))
  }

  const selectedEvent = useMemo(() => {
    return availableEvents.find((event) => event.checked);
  }, [availableEvents]);

  useEffect(() => {
    if(!currentEvent || availableEvents.length)
      return
    async function fetchItems() {
      return await userApi.getAvailableEvents()
    }
    fetchItems().then((events)=>{
      setAvailableEvents(events.body)
      handleCheck(currentEvent?.id,events.body)
    })

  }, [currentEvent]);

  console.log(availableEvents,'events1');


 return { availableEvents, selectedEvent, handleCheck }
};

export default UseAvailableEvents;