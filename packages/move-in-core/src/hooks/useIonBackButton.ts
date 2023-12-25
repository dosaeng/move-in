import { useEffect, useRef } from 'react';

export const useIonBackButton = (
  callback: (event: {
    detail: {
      register(
        priority: number,
        handler: (processNextHandler: () => void) => void
      ): void;
    };
  }) => void
) => {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (ev: any) => {
      callbackRef.current(ev);
    };

    document.addEventListener('ionBackButton', listener);

    return () => {
      document.removeEventListener('ionBackButton', listener);
    };
  }, []);
};
