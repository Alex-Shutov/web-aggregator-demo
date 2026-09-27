import React, { useEffect, useRef, useState } from 'react';
import timer_points from '@public/icons/timer_points.svg';

export type TimerProps = {
  finishDate: string;
  title?: string;
  changeStatus?: (isActive?: boolean) => void;
};

const format = (num: number): string => {
  return num < 10 ? '0' + num : num.toString();
};

const calcTimeFormat = (timeLeft: number): string[] => {
  const newDays = format(Math.floor(timeLeft / (3600 * 24)));
  const newHours = format(Math.floor((timeLeft / 3600) % 24));
  const newMinutes = format(Math.ceil((timeLeft / 60) % 60));

  return [newDays, newHours, newMinutes];
};

function TimerVoting({ finishDate, title = 'До завершения голосования осталось:', changeStatus }: TimerProps) {
  const initialDeadline = Math.max(0, Math.floor((new Date(finishDate).getTime() - Date.now()) / 1000));
  const [timeLeft, setTimeLeft] = useState(initialDeadline);
  const [days, setDays] = useState(calcTimeFormat(initialDeadline)[0]);
  const [hours, setHours] = useState(calcTimeFormat(initialDeadline)[1]);
  const [minutes, setMinutes] = useState(calcTimeFormat(initialDeadline)[2]);
  const closedRef = useRef(false);
  const changeStatusRef = useRef(changeStatus);
  changeStatusRef.current = changeStatus;

  useEffect(() => {
    const deadline = Math.max(0, Math.floor((new Date(finishDate).getTime() - Date.now()) / 1000));
    setTimeLeft(deadline);
    closedRef.current = false;
  }, [finishDate]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [finishDate]);

  useEffect(() => {
    const [newDays, newHours, newMinutes] = calcTimeFormat(timeLeft);
    setDays(newDays);
    setHours(newHours);
    setMinutes(newMinutes);

    if (timeLeft <= 0) {
      if (!closedRef.current) {
        closedRef.current = true;
        changeStatusRef.current?.();
      }
      return;
    }

    changeStatusRef.current?.(true);
  }, [timeLeft]);

  const cardCss = 'h-14 w-8 sm:h-20 sm:w-11 md:h-[6.7rem] md:w-auto text-3xl sm:text-5xl md:text-6xl rounded-md bg-pnl_secondary'

  return (
    <>
      <div className={'mb-4 sm:mb-6 text-base sm:text-xl font-semibold text-txt_main'}>{title}</div>
      <div className="flex items-start justify-start gap-1 sm:gap-2 md:gap-0 overflow-x-auto max-w-full pb-1">
        <div className="flex flex-wrap max-w-[4.5rem] sm:max-w-[7rem] gap-1 justify-center">
            <div className={`${cardCss} flex items-center justify-center flex-1 text-white font-semibold`}>
              {days[0]}
            </div>
            <div className={`${cardCss} flex items-center justify-center flex-1 text-white font-semibold`}>
              {days[1]}
            </div>
          <div className="w-full text-center text-gray-400 text-xs sm:text-sm">дней</div>
        </div>
        <img src={timer_points} className="self-center mx-1 sm:mx-4 h-6 sm:h-auto animate-pulse shrink-0" alt="" />
        <div className="flex flex-wrap max-w-[4.5rem] sm:max-w-[7rem] gap-1 justify-center">
            <div className={`${cardCss} flex items-center justify-center flex-1 text-white font-semibold`}>
              {hours[0]}
            </div>
            <div className={`${cardCss} flex items-center justify-center flex-1 text-white font-semibold`}>
              {hours[1]}
            </div>
          <div className="w-full text-center text-gray-400 text-xs sm:text-sm">часов</div>
        </div>
        <img src={timer_points} className="self-center mx-1 sm:mx-4 h-6 sm:h-auto animate-pulse shrink-0" alt="" />
        <div className="flex flex-wrap max-w-[4.5rem] sm:max-w-[7rem] gap-1 justify-center">
            <div className={`${cardCss} flex items-center justify-center flex-1 text-white font-semibold`}>
              {minutes[0]}
            </div>
            <div className={`${cardCss} flex items-center justify-center flex-1 text-white font-semibold`}>
              {minutes[1]}
            </div>
          <div className="w-full text-center text-gray-400 text-xs sm:text-sm">минут</div>
        </div>
      </div>
    </>
  );
}

export default TimerVoting;
