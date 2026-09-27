import React from 'react';
import Select from '@shared/Selector';
import useEventsFilters from '@components/Home/components/EventsFilter/hooks/useEventsFilters';
import useEvents from '@components/Home/components/EventsFilter/hooks/useEvents';
import SearchSelect from '@shared/SearchSelect';

const EventsFilter = () => {
  const {eventFiltersList,currentEvent,changeCurrentEvent} = useEvents()
  return (
    <SearchSelect
      currentValue={currentEvent?.name??''}
      label={'Выбор события'}
      placeholder={'Выберите семестр'}
      name={'event_select'}
      options={eventFiltersList}
      onChange={changeCurrentEvent}
    />
  );
};

export default EventsFilter;