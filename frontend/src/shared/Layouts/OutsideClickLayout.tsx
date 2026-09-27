import React from 'react';

interface IProps{
  children:React.ReactNode
  isOpen:boolean,
  toggle:()=>void
}
const OutsideClickLayout:React.FC<IProps> = ({children,isOpen,toggle}) => {
  return <>
    {children}

    {isOpen
    ?
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-20"
      onClick={toggle}
      aria-hidden
    />
    :
    null
    }
  </>

};

export default OutsideClickLayout;
