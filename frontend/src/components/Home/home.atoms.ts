import { atom } from 'recoil';
import homeApi from '@components/Home/home.api';
import { IEvent } from '@components/Home/home.types';


export const allEventsState = atom<IEvent[]>({
  key:'/home_event_all',
  default:[]
})

export const homeSelectedEventFilter = atom<IEvent>({
  key:'/home_event_selected_filters',
  default:undefined
})

export const currentEventAtom = atom<IEvent|undefined>({
  key:'/event/current',
  default: undefined
})





