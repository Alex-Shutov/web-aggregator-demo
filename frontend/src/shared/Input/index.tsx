import React, { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';
import TextArea from '@shared/TextArea';

interface IProps extends React.HTMLAttributes<HTMLInputElement>{
  type?:HTMLInputTypeAttribute & 'textarea' | undefined
  readonly?:boolean
  placeholder?:string,
  padding?: string;
  value?:string
  name?:string
  afterElement?:React.ReactNode
}

const Input:React.FC<IProps> = ({ name,type = 'text', placeholder = '', padding = '0rem',afterElement, className,readonly=false,value='',...props }) => {
  if(type==='textarea'){
    return <TextArea className={className} value={value}  readOnly={readonly} name={name??''}
                     placeholder={placeholder}   {...props}/>
  }
  return (
    <>
    <input
      readOnly={readonly}
      value={value}
      type={type}
      name={name??''}
      placeholder={placeholder}
      className={`placeholder-[#bababb] block w-full h-14 p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary text-white placeholder-rgba-white-color ${className}`}
      {...props}
      />
      {!!afterElement && afterElement}
</>
  );
};

export default Input;
