import fscreen from 'fscreen';
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Типизация контекста
type FullscreenContextType = {
  fullscreenRef: React.RefObject<HTMLDivElement>;
  fullscreenEnabled: boolean;
  fullscreenActive: boolean;
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
};

// Создание контекста с начальным значением undefined
const FullscreenContext = React.createContext<FullscreenContextType | undefined>(undefined);

export function useFullscreen(): FullscreenContextType {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error('useFullscreen must be used within a FullscreenProvider');
  }
  return context;
}

type FullscreenProviderProps = {
  children: ReactNode;
};

export const FullscreenProvider: React.FC<FullscreenProviderProps> = ({ children }) => {
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setActive(fscreen.fullscreenElement === fullscreenRef.current);
    };

    fscreen.addEventListener('fullscreenchange', handleChange);

    return () => {
      fscreen.removeEventListener('fullscreenchange', handleChange);
    };
  }, []);

  const enterFullscreen = useCallback(async () => {
    if (fscreen.fullscreenElement) {
      await fscreen.exitFullscreen();
    }
    if (fullscreenRef.current) {
      return fscreen.requestFullscreen(fullscreenRef.current);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    if (fscreen.fullscreenElement === fullscreenRef.current) {
      return fscreen.exitFullscreen();
    }
  }, []);

  const contextValue = useMemo(() => ({
    fullscreenRef,
    fullscreenEnabled: fscreen.fullscreenEnabled,
    fullscreenActive: active,
    enterFullscreen,
    exitFullscreen,
  }), [active, enterFullscreen, exitFullscreen]);

  return (
    <FullscreenContext.Provider value={contextValue}>
      {children}
    </FullscreenContext.Provider>
  );
};
