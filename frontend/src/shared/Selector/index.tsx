import React, { CSSProperties, useState } from 'react';
import dropdownOutline from '@public//icons/arrows/dropdown_outline.svg';

interface IProps {
  label: string;
  selectStyle?: CSSProperties;
  optionStyle?: CSSProperties;
  name: string;
  onChange: (value: string) => void;
  options: any[];
  prop: string;
  idProp?: string;
  placeholder: string;
  currentValue: string;
  disabled?: boolean;
  continaerClass?: string;
}

const Select: React.FC<IProps> = ({
                                    label,
                                    currentValue,
                                    onChange,
                                    options,
                                    placeholder,
                                    disabled = false,
                                    continaerClass,
                                    selectStyle,
                                    optionStyle,
                                    idProp,
                                    prop
                                  }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    if (!disabled) {
      setIsOpen(old => !old);
    }
  };

  return (
    <div className={`mb-10 w-full ${continaerClass}`}>
      <h2 className="text-2xl font-semibold mb-6">{label}</h2>
      <div className={`bg-pnl_secondary p-4 relative min-w-[166px] ${disabled ? 'cursor-not-allowed' : ''}`}>
        <div
          className={`cursor-pointer flex items-center flex-row justify-between gap-2.5 font-medium text-sm bg-bt_selector_value pl-5 pr-4 rounded ${disabled ? 'bg-gray-200 text-gray-500' : ''}`}
          onClick={toggle}
          style={selectStyle}
        >
          <span>{currentValue || placeholder}</span>
          <div>
            <img src={dropdownOutline} />
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-[120%] max-h-52 overflow-y-scroll left-0 z-10 w-full bg-dark-grey-color max-h-45 overflow-y-auto bg-bt_selector_value_drop">
            <div className="p-2">
              {options?.map((item: any, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2.5 text-rgba-white-color font-medium`}
                  onClick={() => {
                    if (!disabled) {
                      onChange(idProp && item.hasOwnProperty(idProp) ? item[idProp] : item.hasOwnProperty(prop) ? item[prop] : item?.id);
                      setIsOpen(!isOpen);
                    }
                  }}
                  style={optionStyle}
                >
                  {item.name ?? item.label ?? item[prop] ?? ''}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
