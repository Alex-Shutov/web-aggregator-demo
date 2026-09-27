import React, { useRef } from 'react';
import { STORAGE_URL } from '@shared/constants';

interface IProps{
  id:string
}
const Index :React.FC<IProps>= ({id}) => {
  const imgRef = useRef(null)
  const handleSetDefualtImg = (target: EventTarget & HTMLImageElement) => {
    target.src = 'https://freepngimg.com/thumb/categories/1736.png'
  }
  return (
    <div className="w-full sm:w-52 sm:mr-8 h-40 sm:h-22 shrink-0">
      <img
        ref={imgRef}
        onError={(event)=>handleSetDefualtImg(event.currentTarget)}
        src={`${STORAGE_URL}/${id}/main_image_0.jpg`}
        alt=""
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};

export default Index;
