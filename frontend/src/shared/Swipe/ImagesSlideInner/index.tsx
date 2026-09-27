import React, { CSSProperties } from 'react';
import useBlobUrl from '../../../hooks/useBlobUrl';

interface IProps{
  image:Blob
  style:CSSProperties
}
const Index:React.FC<IProps> = ({image,style}) => {
  const imageSrc = useBlobUrl(image)
  return (
    <div>
      <img src={imageSrc} style={{...{ width: '100%'},...style}} alt="" />
    </div>
  );
};

export default Index;