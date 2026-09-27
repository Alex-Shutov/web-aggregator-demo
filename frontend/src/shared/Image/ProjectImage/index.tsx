import React, { HTMLAttributes } from 'react';
import Image from '@shared/Image';
import { STORAGE_URL } from '@shared/constants';

interface IProps extends  HTMLAttributes<HTMLImageElement>{
  id:string
  imgName:string,
  className?:string
}
const Index:React.FC<IProps> = ({id,imgName,className, ...props}) => {
  return (
    <Image src={`${STORAGE_URL}/${id}/${imgName}`} className={className} {...props}/>
  );
};

export default Index;
