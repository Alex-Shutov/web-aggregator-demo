import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getHomeEventsList } from '@components/Home/home.selectors';
import { allEventsState, currentEventAtom } from '@components/Home/home.atoms';
import { IEvent, IEventStatus } from '@components/Home/home.types';

const UseEvents = () => {
  const [eventFiltersList, setEventFilters] = useRecoilState(allEventsState);
  const fetchedEventFiltersList = useRecoilValue(getHomeEventsList);
  const [currEvent, setCurrentEvent] = useRecoilState(currentEventAtom);

  useEffect(() => {
    if (currEvent) {
      return;
    }

    const curEvent = fetchedEventFiltersList?.find(
      (el: IEvent) => el.status === IEventStatus.OPENED || el.status === IEventStatus.OPEN_VOTE
    );

    if (curEvent) {
      setCurrentEvent({ ...curEvent, checked: true });
    }
  }, [fetchedEventFiltersList, currEvent, setCurrentEvent]);


  const changeCurrentEventInEventsList = (updateEventId: string) => {
    const updateEvent = eventFiltersList.find(el => el.id === updateEventId);
    if (updateEvent) {
      setCurrentEvent(updateEvent);
      setEventFilters((prev) =>
        prev.map((el) => {
          if (el.id === updateEvent.id) {
            return { ...updateEvent, checked: true };
          } else if (el.checked) {
            return { ...el, checked: false };
          }
          return el;
        })
      );
    }
  };

  const applyEventUpdate = useCallback((updated: Partial<IEvent> & { id: string }) => {
    setEventFilters((prev) =>
      prev.map((el) => (el.id === updated.id ? { ...el, ...updated } : el))
    );
    setCurrentEvent((prev) =>
      prev?.id === updated.id ? { ...prev, ...updated } : prev
    );
  }, [setCurrentEvent, setEventFilters]);

  useEffect(() => {
    setEventFilters(
      fetchedEventFiltersList?.map((event) => ({
        ...event,
        checked: event.status === IEventStatus.OPENED || event.status === IEventStatus.OPEN_VOTE,
      }))
    );
  }, [fetchedEventFiltersList, setEventFilters]);

  return {
    eventFiltersList,
    currentEvent: currEvent,
    changeCurrentEvent: changeCurrentEventInEventsList,
    applyEventUpdate,
  };
};

export default UseEvents;
