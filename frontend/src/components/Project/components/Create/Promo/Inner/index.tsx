import React from 'react';

interface IProps{
  mainText:string,
  secondaryText?:string
  aspectRatio?:'16:9'
}

const Inner:React.FC<IProps> = ({mainText,secondaryText,aspectRatio}) => {
  return (
    <div>
      <div className={'text-lg font-semibold text-txt_main mb-1'}>{mainText}</div>
      {secondaryText && <div className={'text-md text-txt_secondary  mb-2'}>{secondaryText}</div>}
      {aspectRatio && <div className={'text-2xl text-txt_secondary font-bold'}>{aspectRatio}</div>}
    </div>
  );
};

export default Inner;