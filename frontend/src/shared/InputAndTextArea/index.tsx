import { ReactNode } from 'react';

export const Block = (children:any) => {
  return <div className="w-full mb-12">{children}</div>;
};

export const BlockTextArea = Block;

export const WrapperNameInput = ({ children, isInvalid }:any) => {
  return (
    <div
      className={`flex items-center w-full mb-6 px-4 py-6 bg-dark-grey-color ${isInvalid ? 'border border-red-500' : ''}`}>
      {children}
    </div>
  );
};

export const WrapperTextareaInput = WrapperNameInput;

export const Counter = ({ children }:any) => {
  return (
    <div className="flex justify-end text-grey-title font-normal text-lg">
      {children}
    </div>
  );
};
