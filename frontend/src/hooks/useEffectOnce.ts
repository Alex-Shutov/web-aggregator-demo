import { useEffect, useRef } from 'react';

function useEffectOnce(callback:any, dependencies:any) {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!calledOnce.current) {
      calledOnce.current = true;
      callback();
    }
  }, dependencies);
}

export default useEffectOnce;