import React, { useEffect, useState } from 'react';
import { IEvent, IEventStatus } from '@components/Home/home.types';
import BadgeList from '@shared/Badge/BadgeList';
import firstPlace from '@public/icons/place_flag/place_1.svg';
import secondPlace from '@public/icons/place_flag/place_2.svg';
import thirdPlace from '@public/icons/place_flag/place_3.svg';
import { IUser } from '@components/User/user.types';
import userApi from '@components/User/user.api';
import useSocket from '@hooks/useSocket';
import useUser from '@components/User/hooks/useUser';

interface IProps {
  currentEvent?: IEvent;
  user: IUser | null;
}

const EventInfo: React.FC<IProps> = ({ currentEvent, user }) => {
  const { changeUser } = useUser();
  const { on } = useSocket();
  const [fires, setFires] = useState<number>(user?.fires ?? 15);

  useEffect(() => {
    if (!currentEvent?.id || !user?.id) {
      setFires(15);
      return;
    }

    userApi.getFiresBalance(currentEvent.id).then((resp) => {
      if (resp.status === 'success') {
        const nextFires = resp.body?.fires ?? 15;
        setFires(nextFires);
        changeUser('fires', nextFires);
      }
    });
  }, [currentEvent?.id, user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    return on('projectRated', (payload: { grade?: { fires?: number; user?: string } }) => {
      if (payload?.grade?.fires == null) return;
      if (payload.grade.user && payload.grade.user !== user.id) return;
      setFires(payload.grade.fires);
      changeUser('fires', payload.grade.fires);
    });
  }, [on, user?.id, changeUser]);

  return (
    <div className="flex-1 mt-6 lg:mt-0">
      <div className="mb-4 flex flex-col items-start lg:items-end">
        <p className="text-xl sm:text-2xl text-white font-medium mb-1">
          Событие: {currentEvent ? <span>{currentEvent.name}</span> : <span>Событие не найдено</span>}
        </p>
        {currentEvent && (
          <div className="text-base sm:text-lg font-normal text-white mb-4">
            <span
              className={`${currentEvent.status === IEventStatus.OPENED ? 'text-txt_ind_main' : 'text-txt_ind_secondary'}`}>{currentEvent.status === IEventStatus.OPENED ? 'Началось' : 'Завершено'}</span>
          </div>
        )}
        {currentEvent && user && (
          <div className="text-base sm:text-lg font-normal text-white mb-4">
            В наличии:
            <div className="relative inline-block top-2 ml-2">
              <img src={'/icons/voices.svg'} alt="Иконка наличии голосов"
                className={`${currentEvent.status === IEventStatus.OPENED ? 'opacity-50 ' : ''}`} />
              <div className="absolute bottom-0 left-0 w-full text-white text-center text-sm">
                {fires} голосов
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex flex-col items-start lg:items-end">Призы первых мест:</h2>
        <BadgeList badges={
          [{
            number: 1,
            boldText: '15 баллов',
            defaultText: '+ мерч Проектного практикума',
            urlImage: firstPlace,
          },
          {
            number: 2,
            boldText: '15 баллов',
            defaultText: '+ мерч Проектного практикума',
            urlImage: secondPlace,
            className: '!bg-pnl_first',
          },
          {
            number: 3,
            boldText: '15 баллов',
            defaultText: '+ мерч Проектного практикума',
            urlImage: thirdPlace,
            className: '!bg-pnl_first',
          },
          ]
        } />
      </div>
    </div>
  );
};

export default EventInfo;
