import unwrap from "@public/icons/unwrap.svg";
import roll_up from "@public/icons/roll_up.svg";
import React from 'react';
import DisplayUnity from '@components/Project/components/Play/DisplayUnity';
import { useFullscreen } from '@components/Project/hooks/useFullScreen';

type DisplayProps = {
  id:string
};

const Display:React.FC<DisplayProps> = ({ id }: DisplayProps) => {
  const { fullscreenRef, enterFullscreen, exitFullscreen, fullscreenActive } = useFullscreen();

  const bucketName = id

  return (
    <div className={`relative mx-auto w-full ${fullscreenActive ? 'max-w-none' : 'max-w-screen-lg'}`} ref={fullscreenRef}>
      <div className={`flex flex-col items-center justify-center w-full overflow-hidden bg-pnl_fourth ${fullscreenActive ? 'fixed inset-0 z-50 w-screen h-screen' : ''}`}>
        <DisplayUnity fullScreen={fullscreenActive} id={bucketName} />
      </div>
      {fullscreenActive ? (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-md bg-pnl_secondary px-3 py-2"
          onClick={exitFullscreen}
        >
          <span className="text-txt_secondary text-sm sm:text-lg">Свернуть</span>
          <img src={roll_up} alt="Свернуть" className="w-5 h-5" />
        </button>
      ) : (
        <button type="button" className="mt-2 w-full flex justify-end items-center gap-2" onClick={enterFullscreen}>
          <span className="text-txt_secondary text-sm sm:text-lg">Развернуть</span>
          <img src={unwrap} alt="Развернуть" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
export default Display
