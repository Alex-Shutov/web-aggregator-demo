import React from "react";
import arrow from "@public/icons/arrows/arrow_left.svg";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange?: (page: number) => void; // добавляем новое свойство
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  const handlePrevClick = () => {
    if (current > 1) {
      onPageChange && onPageChange(current - 1);
    }
  };

  const handleNextClick = () => {
    if (current < total) {
      onPageChange && onPageChange(current + 1);
    }
  };

  return (
    <div className="flex items-center text-light-grey-color">
      <PaginationButton onClick={handlePrevClick} disabled={current === 1}>
        <img src={arrow} alt="Left arrow" className="rotate-180" />
      </PaginationButton>
      <div className="px-4 text-base">{current} из {total}</div>
      <PaginationButton onClick={handleNextClick} disabled={current === total}>
        <img src={arrow} alt="Right arrow" />
      </PaginationButton>
    </div>
  );
};

interface PaginationButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
      className={`transition-opacity duration-300 ease-in-out ${disabled ? 'opacity-45' : 'hover:opacity-80'}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Pagination;