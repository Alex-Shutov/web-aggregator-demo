import React, { ChangeEvent, CSSProperties, useState, useRef, useEffect } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';
import searchIcon from '@public/icons/search.svg';

interface IProps<T> {
  label?: string;
  selectStyle?: string;
  optionStyle?: string;
  name: string;
  onChange: (value: T) => void;
  placeholder: string;
  currentValue: string;
  disabled?: boolean;
  searchItems: (query: string) => Promise<T[]>;
  renderOption: (item: T) => React.ReactNode;
}

const SearchSelectAsync = <T,>({
                                 label,
                                 currentValue,
                                 optionStyle,
                                 selectStyle,
                                 onChange,
                                 name,
                                 placeholder,
                                 disabled,
                                 searchItems,
                                 renderOption,
                               }: IProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(currentValue);
  const [options, setOptions] = useState<T[]>([]);

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

  useEffect(() => {
    setSearchTerm(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (searchTerm.length >= 4) {
      searchItems(searchTerm).then(setOptions);
    }
  }, [searchTerm, searchItems]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= 4) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="mb-10 w-full">
      {label && <h2 className="text-2xl font-medium mb-6">{label}</h2>}
      <div className="bg-pnl_secondary flex p-2.5 relative min-w-[166px]">
        <div className={`cursor-pointer flex items-center flex-row justify-between gap-2.5 font-medium text-sm bg-bt_selector_value pl-5 pr-4 rounded ${selectStyle}`}>
          <input
            onClick={() => {
              if (inputRef.current && inputRef.current.readOnly)
                inputRef.current.readOnly = false;
            }}
            ref={inputRef}
            type="text"
            readOnly={false}
            placeholder={placeholder}
            className={`!outline-none  focus:bg-[#3d3d3d] focus:border-none active:border-none active:bg-transparent read-only:bg-[#3d3d3d] read-only:text-white bg-[#3d3d3d] text-white px-4 py-2 rounded-md w-full my-2`}
            value={searchTerm}
            onChange={handleSearch}
            disabled={disabled}
          />
        </div>
        <div className="self-center w-[24px] h-[24px]">
          <img src={searchIcon} alt="search icon" />
        </div>
        {isOpen && options.length && (
          <div className="absolute max-h-48 top-[120%] left-0 z-10 w-full bg-dark-grey-color overflow-y-auto scrollbar bg-bt_selector_value_drop">
            <div className="p-2">
              {options.map((item, index) => (
                <div
                  // key={index}
                  className="cursor-pointer p-2.5 text-rgba-white-color font-medium"
                  onClick={() => {
                    onChange(item);
                    setIsOpen(false);
                    setSearchTerm( currentValue);

                  }}
                >
                  {renderOption(item)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSelectAsync;
