import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type ButtonType =
  'bt_primary'
  | 'bt_danger'
  | 'bt_secondary'
  | 'bt_primary_outline'
  | 'bt_danger_outline'
  | 'bt_secondary_outline'

interface IButtonProps {
  asContainer?: boolean
  onClick?: () => void
  type: ButtonType,
  style?: CSSProperties
  classNameContainer?: string
  classNameButton?: string
  to?: string;
  children?: React.ReactNode;
  disabled?: boolean
}

const Button: React.FC<IButtonProps> = ({
                                          disabled,
                                          asContainer,
                                          onClick,
                                          children,
                                          to = '',
                                          type,
                                          classNameContainer,
                                          classNameButton,
                                        }) => {
  const isOutline = type.includes('outline');

  const colorVariants = {
    bt_outline: 'outline outline-1',
    bt_disabled: 'disabled:bg-bt_disabled disabled:text-txt_disabled ',
    bt_primary: 'text-txt_main bg-bt_primary hover:bt_primary_hover focus:bg-bt_primary_focus',
    bt_danger: 'text-txt_main bg-bt_danger hover:bg-bt_danger_hover focus:bg-bt_danger_focus',
    bt_secondary: 'text-txt_main bg-bt_secondary hover:bg-bt_secondary_hover focus:bg-bt_secondary_focus',
    bt_primary_outline: 'text-bt_primary outline-bt_primary  hover:outline-bt_primary_hover focus:bg-bt_primary_focus',
    bt_danger_outline: 'text-bt_danger outline-bt_danger  hover:outline-bt_danger_hover focus:bg-bt_danger_focus',
    bt_secondary_outline: 'text-bt_secondary outline-bt_secondary  hover:outline-bt_secondary_hover focus:bg-bt_secondary_focus',
    red: 'bg-red-600 hover:bg-red-500',
  };

  const renderButton = (cls: string) => asContainer ?
    (<div onClick={onClick}
          className={`cursor-pointer w-28 h-10 font-semibold rounded-sm transition disabled:bg-bt_disabled duration-300 ${classNameButton} ${cls}`}>{children}</div>) : (

      <button disabled={disabled} onClick={onClick}
              className={`w-28 h-10 font-semibold rounded-sm transition disabled:bg-bt_disabled duration-300 ${classNameButton} ${cls}`}>
        {children}
      </button>
    );

  const buttonJsx = isOutline ?
    renderButton(`${colorVariants['bt_outline']} ${colorVariants[type]}`)
    :
    renderButton(`${colorVariants[type]}`);


  return (
    to ?
      <Link to={to} className={`inline-block ${classNameContainer}`}>
        {buttonJsx}
      </Link> : <div className={classNameContainer}>{buttonJsx}</div>
  );
};

export default Button;