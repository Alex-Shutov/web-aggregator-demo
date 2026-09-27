import React from 'react';

interface IProps{
  children:React.ReactNode;
}

const NavLayout:React.FC<IProps> = ({children}) => {
  return (
    <div className={`sticky z-20 mb-20 bg-pnl_secondary`} >
      {children}
    </div>
  );
};

export default NavLayout;