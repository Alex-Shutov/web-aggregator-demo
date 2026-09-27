import React from 'react';
import { bool } from 'yup';

interface CheckboxProps extends React.HTMLAttributes<HTMLElement|HTMLInputElement> {
  labelTxt: string;
  isChecked:boolean;
  onChange:()=>void

}

const Checkbox: React.FC<CheckboxProps> = ({ labelTxt,isChecked,onChange }) => {
  return (
    <label className="flex items-center justify-start mb-4 ml-2 gap-2 text-base cursor-pointer">
      <input onChange={()=>onChange()} defaultChecked={false} checked={isChecked} type="checkbox" className="hidden peer" />
      <div
        className={`w-6 h-6 border-2 border-gray-400 rounded-lg flex-none cursor-pointer transition-colors peer-checked:bg-no-repeat peer-checked:bg-center basis-6  peer-checked:bg-[length:1.6rem] peer-checked:border-black peer-checked:bg-[#D0E6EE]`}
      />
      <span className="text-lg text-gray-300">{labelTxt}</span>
    </label>
  );
};

export default Checkbox;