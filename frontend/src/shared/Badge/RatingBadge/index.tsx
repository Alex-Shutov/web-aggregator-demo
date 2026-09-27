import React from 'react';
interface IProps{
  urlImage:string,
  number:number
}
const Index:React.FC<IProps> = ({urlImage,number}) => {
  return (
    <div className="relative w-8 h-12  right-[-15px]">
      <div
        style={{ backgroundImage: `url(${urlImage})` }}
        className={`absolute top-0 left-0 w-full h-full bg-no-repeat bg-center  rounded-md`} />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
        {number}
      </div>
    </div>
  );
};

export default Index;