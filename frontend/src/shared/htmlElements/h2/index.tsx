import React from 'react';

const H2:React.FC<any> = ({children}) => {
  return (
    <h2 className="text-[2.4rem] font-medium leading-[2.9rem] text-white mb-10">
      {children}
    </h2>
  );
};

export default H2;