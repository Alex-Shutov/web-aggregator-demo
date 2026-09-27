import { selector } from 'recoil';
import menuAtom from './menu.atom';

const toogleMenu = selector({
  key:'/menu/selector',
  get:({get})=>{
    const isOpen = get(menuAtom)
    return !isOpen
  }
})