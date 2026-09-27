import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  label: string;
  path: string;
  className?:string
}
const HeaderLink: React.FC<IProps>= ({label,path,className}) => {
  return (
    <li className={`list-none py-2 lg:py-0 ${className ?? ''}`}>
      <Link to={path} className="block text-txt_main hover:text-txt_info text-base lg:text-inherit">
        {label}
      </Link>
    </li>
  );
};

export default HeaderLink;