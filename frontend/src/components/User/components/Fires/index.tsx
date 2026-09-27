import React from 'react';
import FireIcon from '@public/icons/voices.svg'
import { ReactComponent } from '*.svg';

interface IProps{
  firesCount:number|undefined
}

const Fires:React.FC<IProps> = ({firesCount}) => {
  return (
    <>
      <div className={'flex items-center h-8 w-8'}>
        {firesCount !== null && <div className={'flex row items-center'}>
          <img src={FireIcon} className={`h-full w-full ${firesCount===0 ? 'grayscale' : '' } `}></img>
          <span className={'text-txt_main fw-bolder'}>{firesCount}</span>
        </div>}
    </div>
    </>
  );
};

export default Fires;