import classNames from 'classnames';
import React from 'react';

interface ErrorTextProps {
  bigSize?: boolean;
  children: React.ReactNode;
}

const ErrorText: React.FC<ErrorTextProps> = ({ bigSize, children }) => {
  return (
    <p
      className={classNames(
        'absolute bottom-[-1.2rem] left-[1px] h-[1.6rem] z-0 pt-[0.8rem] font-normal leading-[1.9rem] text-input-title transition-opacity duration-300 ease-in-out',
        {
          'text-[1.8rem]': bigSize,
          'text-[1.4rem]': !bigSize,
        }
      )}
    >
      {children}
    </p>
  );
};

export default ErrorText;