import React, { useEffect, useState } from "react";
import prize_place_default from "@public/icons/place_flag/place_default.svg";
import prize_place_1 from "@public/icons/place_flag/place_1.svg";
import prize_place_2 from "@public/icons/place_flag/place_2.svg";
import prize_place_3 from "@public/icons/place_flag/place_3.svg";
import voices_svg from "@public/icons/voices.svg";
import useUser from "@components/User/hooks/useUser";
import { isDemoUser } from "@utils/isDemoUser";
import useEvents from "@components/Home/components/EventsFilter/hooks/useEvents";
import { handleSubmit } from "@utils/snackbar";
import useSocket from "@hooks/useSocket";
import { IEventStatus } from "@components/Home/home.types";

export type TypeRating = {
  title?: string;
  currentPlace: number;
  fullVoices: number;
  currentVoices: number;
  endVoting?: boolean;
  button?: boolean;
  projectId?: string;
};

const RatingProject: React.FC<TypeRating> = ({
                                               title = "Рейтинг проекта",
                                               button,
                                               currentPlace,
                                               fullVoices,
                                               currentVoices,
                                               endVoting = false,
                                               projectId,
                                             }) => {
  const { user } = useUser();
  const { currentEvent } = useEvents();
  const { emit, on, connected } = useSocket();
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState(currentVoices);
  const demo = isDemoUser(user);
  const votingClosed =
    endVoting ||
    currentEvent?.status === IEventStatus.CLOSE_VOTE ||
    currentEvent?.status === IEventStatus.CLOSED;
  const percentVoices = fullVoices ? (voices / fullVoices) * 100 : 0;
  const nextPlace = votingClosed ? 0 : currentPlace - 1;

  useEffect(() => {
    return on('projectRated', (payload: { project?: { id: string; rating?: number }; grade?: { project?: string } }) => {
      const ratedProjectId = payload?.project?.id || payload?.grade?.project;
      if (ratedProjectId && ratedProjectId === projectId && payload?.project?.rating != null) {
        setVoices(payload.project.rating);
      } else if (ratedProjectId === projectId) {
        setVoices((prev) => prev + 5);
      }
    });
  }, [on, projectId]);

  useEffect(() => {
    return on('error', (message: string) => {
      handleSubmit(typeof message === 'string' ? message : 'Ошибка голосования');
      setLoading(false);
    });
  }, [on]);

  const handleVote = () => {
    if (demo) {
      handleSubmit("Голосование недоступно в демо-режиме");
      return;
    }
    if (!projectId || !currentEvent?.id || loading || votingClosed) return;
    if (!connected) {
      handleSubmit("Нет подключения к WebSocket");
      return;
    }
    setLoading(true);
    emit('socket.rateProject', { projectId, eventId: currentEvent.id });
    setTimeout(() => setLoading(false), 800);
    handleSubmit("Голос отправлен");
  };

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex items-center">
        <Place placeNum={currentPlace} />
        <ProgressLine percentVoices={percentVoices} nextPlace={nextPlace} />
        <Place placeNum={nextPlace} />
      </div>
      <div className="flex justify-center items-center gap-2 my-2">
        <img src={voices_svg} alt="Иконка голосов" className="w-8 h-8" />
        <span className="text-[#D0E6EE] text-lg font-semibold">
          {voices} / {fullVoices}
        </span>
      </div>
      <div className="text-[#B6B6B6] text-lg font-normal mb-1">
        Отдано голосов
      </div>
      <div className="flex items-center gap-2 mb-8">
        <img src={voices_svg} alt="Иконка голосов" className="w-9 h-9" />
        <span className="text-[#D0E6EE] text-xl font-bold">{voices}</span>
      </div>
      {button && (
        <button
          disabled={votingClosed || demo || loading || !connected}
          type="button"
          onClick={handleVote}
          className="relative w-full h-[5.1rem] p-4 flex flex-col items-center justify-center text-[#D0E6EE] text-2xl font-semibold border border-blue-400 bg-gray-900 rounded-md transition-all duration-300 hover:border-red-400 disabled:opacity-50"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {demo
              ? "Голосование в демо недоступно"
              : votingClosed
                ? "Голосование завершено"
                : loading
                  ? "…"
                  : "Проголосовать"}
          </div>
        </button>
      )}
    </div>
  );
};

const ProgressLine: React.FC<{ percentVoices: number; nextPlace: number }> = ({
                                                                                percentVoices,
                                                                                nextPlace,
                                                                              }) => {
  return (
    <div
      className={`relative flex-1 h-[1.7rem] m-0 -mx-[2px] p-1 bg-gradient-to-r ${nextPlace === 1 || nextPlace === 0
        ? "from-orange-500 to-yellow-500"
        : nextPlace === 2
          ? "from-blue-500 to-gray-400"
          : "from-brown-500 to-brown-600"
      }`}
    >
      <div className="w-full h-full bg-gray-800 p-[2px]">
        <div
          className={`h-full ${percentVoices !== 100 && "border-r-[3px] border-white"
          } bg-gradient-to-r ${nextPlace === 1 || nextPlace === 0
            ? "from-orange-500 to-yellow-500"
            : nextPlace === 2
              ? "from-blue-500 to-gray-400"
              : "from-brown-500 to-brown-600"
          }`}
          style={{ width: `${percentVoices}%` }}
        />
      </div>
    </div>
  );
};

const Place: React.FC<{ placeNum: number }> = ({ placeNum }) => {
  const getPlaceImage = (placeNum: number) => {
    switch (placeNum) {
      case 1:
        return prize_place_1;
      case 2:
        return prize_place_2;
      case 3:
        return prize_place_3;
      default:
        return prize_place_default;
    }
  };

  return (
    <div
      className="relative z-10 flex-0 w-[2.7rem] h-[4.3rem] pt-4 text-center text-white text-lg font-semibold bg-gray-900 bg-contain bg-center"
      style={{ backgroundImage: `url('${getPlaceImage(placeNum)}')` }}
    >
      {placeNum !== 0 && <span>{placeNum}</span>}
    </div>
  );
};

export default RatingProject;
