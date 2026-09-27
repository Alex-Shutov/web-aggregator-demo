import React, { FC, HTMLAttributes } from 'react';
import arrowLeft from '@public/icons/arrows/arrow_left.svg';
interface IProps extends HTMLAttributes<HTMLImageElement>{
  className?:string
  src:string,
}
const Index:FC<IProps> = ({className,src,...rest}) => {
  return (
      <img src={src} alt={' '} className={` ${className}`} {...rest} />
  );
};

export default Index;