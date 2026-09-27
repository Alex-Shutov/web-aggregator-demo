import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useEvents from '@components/Home/components/EventsFilter/hooks/useEvents';
import TimerVoting from '@components/Home/components/TImerVoting';
import EventInfo from '@components/Home/components/VotingProjects/EventInfo';
import useUser from '@components/User/hooks/useUser';
import useSocket from '@hooks/useSocket';
import { IEventStatus } from '@components/Home/home.types';
import { handleSubmit } from '@utils/snackbar';


const VotingProjects = () => {
  const { currentEvent, applyEventUpdate } = useEvents()
  const { user } = useUser()
  const { emit, on } = useSocket()

  useEffect(() => {
    return on('eventStatusChanged', (payload: { event?: { id: string; status: IEventStatus; name: string; finishDate?: string | Date } }) => {
      if (!payload?.event) return
      applyEventUpdate({
        ...payload.event,
        finishDate: payload.event.finishDate
          ? new Date(payload.event.finishDate)
          : undefined,
      })
      if (payload.event.status === IEventStatus.CLOSE_VOTE || payload.event.status === IEventStatus.CLOSED) {
        handleSubmit('Голосование завершено')
      }
    })
  }, [on, applyEventUpdate])

  const changeStatus = useCallback((isActive?: boolean) => {
    if (isActive) return
    if (!currentEvent?.id) return
    if (
      currentEvent.status === IEventStatus.CLOSE_VOTE ||
      currentEvent.status === IEventStatus.CLOSED
    ) {
      return
    }
    emit('socket.closeVoting', { eventId: currentEvent.id })
  }, [currentEvent, emit])

  return (
    <div className="flex flex-col lg:flex-row justify-between mb-8 sm:mb-10 gap-4">
      <div className="flex-1 flex-grow-[1.8] lg:mr-10 min-w-0">
        <p className="text-xl sm:text-2xl font-medium text-white mb-4 sm:mb-6">Голосование за лучший проект</p>
        <p className="text-txt_secondary text-base sm:text-lg font-light mb-4">
          Вы попали на страницу студенческих игровых проектов, которые создаются в рамках{' '}
          <span className='text-txt_main font-bold'>проектного обучения</span> студентами <span className='text-txt_main font-bold'>2-3 курса института ИРИТ-РтФ УрФУ</span>. Если вы{' '}
          <span className="text-blue-400">студент</span>, то вы можете отдать свой голос за понравившийся вам проект и
          поддержать команду.
        </p>
        <p className="text-txt_secondary text-base sm:text-lg font-normal mb-4">
          Если вы <span className="text-blue-400">эксперт</span> из <span className='text-txt_main font-bold'>IT-сферы</span>, то приглашаем вас поучаствовать в
          защитах проектов в составе экспертной комиссии.<br />
          <span className={'inline-flex flex-wrap gap-2'}>
            Подробнее на странице {' '}
            <Link target='_blank' to="https://rtf.urfu.ru/ru/news/38879/" className="text-blue-400 hover:underline">
              {' '}Защиты проектов
            </Link>
          </span>

        </p>
        {currentEvent?.finishDate && (
          <TimerVoting
            finishDate={String(currentEvent.finishDate)}
            changeStatus={changeStatus}
          />
        )}
      </div>
      <EventInfo currentEvent={currentEvent} user={user} />
    </div>
  );
};

export default VotingProjects;
