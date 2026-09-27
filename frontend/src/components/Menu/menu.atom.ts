import { atom } from 'recoil';

interface IMenuState{
  isMenuOpen:boolean
}

const menuAtom = atom<IMenuState>({
  key:'/menu',
  default:{isMenuOpen:false}
})

export default menuAtom