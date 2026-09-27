import React, { ChangeEvent, CSSProperties, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import search from '@public//icons/search.svg';
import { IEvent } from '@components/Home/home.types';
import useOutsideClick from '@hooks/useOutsideClick';
import OutsideClickLayout from '@shared/Layouts/OutsideClickLayout';

export interface ISelectOption {
  title: string;
  value: string;
}

interface IProps {
  label: string
  selectStyle?: CSSProperties
  optionStyle?: CSSProperties,
  name: string,
  onChange: (value: string) => void
  options: IEvent[];
  placeholder: string
  currentValue: string
  disabled?: boolean
}


const SearchSelect: React.FC<IProps> = ({
                                          label,
                                          currentValue,
                                          optionStyle,
                                          selectStyle,
                                          onChange,
                                          name,
                                          options,
                                          placeholder,
                                          disabled,
                                        }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    setSearchTerm(options?.filter(el => el.checked)[0]?.name);
  }, [options, currentValue]);
  const toggle = () => {
    setIsOpen(old => !old);
  };


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const filteredOptions = options?.filter(option =>
    option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  useOutsideClick(containerRef, () => {
    if (inputRef.current && containerRef.current) {
      setIsOpen(false);
      setSearchTerm(currentValue);
      inputRef.current.readOnly = true;
      inputRef.current.blur();
    }
  });
  return (
    <div
      ref={containerRef}
      className={`mb-10 w-full`}
    >
      <h2 className="text-2xl font-medium mb-6">{label}</h2>
      <div className="bg-pnl_secondary flex p-2.5 relative min-w-[166px]">
        <div
          className={`cursor-pointer flex items-center flex-row justify-between gap-2.5 font-medium text-sm bg-bt_selector_value pl-5 pr-4 rounded `}
        >
          <input
            onClick={() => {
              if (inputRef.current && inputRef.current.readOnly)
                inputRef.current.readOnly = false;
            }}
            ref={inputRef}
            type="text"
            readOnly={true}
            placeholder={'Поиск'}
            className=" !outline-none focus:bg-[#3d3d3d] focus:border-none active:border-none active:bg-transparent read-only:bg-[#3d3d3d]  read-only:text-white bg-[#3d3d3d] text-white px-4 py-2 rounded-md w-full my-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          {/*<span*/}
          {/*  className={'h-[40px] flex items-center'}>{options?.filter(el => el.checked).length ? options?.filter(el => el.checked)[0].name : 'Выберите из списка'}</span>*/}

        </div>
        <div className={'self-center w-[24px] h-[24px]'}>
          <img src={search} />
        </div>
        {isOpen && (
          <div
            className="absolute max-h-48  top-[120%] left-0 z-10 w-full bg-dark-grey-color max-h-45 overflow-y-auto scrollbar bg-bt_selector_value_drop">
            <div className="p-2">
              {filteredOptions?.map((item: any) => (
                <div
                  key={item.id}
                  className={`cursor-pointer p-2.5 text-rgba-white-color font-medium `}
                  onClick={() => {
                    setSearchTerm(item.name);
                    onChange(item.id);
                    setIsOpen(!isOpen);
                  }

                  }
                >
                  {item.name}
                  {/*<div className="w-4 h-4 bg-center bg-no-repeat bg-contain transform rotate-180" style={{ backgroundImage: `url(${dropdownOutline})` }}></div>*/}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchSelect;
