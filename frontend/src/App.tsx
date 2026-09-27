import React, { Suspense, useEffect } from 'react';
import { AppRender } from './routes/routes.render';
import AuthProvider from '@components/Auth/auth.provider';
import { FullscreenProvider } from '@components/Project/hooks/useFullScreen';
import { register } from 'swiper/element/bundle';
import { atom, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
register();

function App() {
  const location = useLocation();
  const setLocation = useSetRecoilState(locationState);

  useEffect(() => {
    setLocation(location.pathname);
  }, [location, setLocation]);

  return (
    <div className="App">
      <Suspense fallback={<div />}>
        <FullscreenProvider>
          <AppRender/>
        </FullscreenProvider>
      </Suspense>
    </div>
  );
}


export const locationState = atom({
  key: 'locationState',
  default: window.location.pathname,
});


export default App;
