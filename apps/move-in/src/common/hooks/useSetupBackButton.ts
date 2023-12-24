import { App } from '@capacitor/app';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useSetupBackButton = () => {
  const history = useHistory();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (ev: any) => {
      ev.detail.register(0, (processNextHandler: () => void) => {
        history.goBack();
        processNextHandler();
      });

      ev.detail.register(-1, () => {
        if (
          window.location.pathname === '/sign-up/account-info' ||
          window.location.pathname === '/sign-in' ||
          window.location.pathname === '/product-filters'
        ) {
          App.exitApp();
        }
      });
    };

    document.addEventListener('ionBackButton', listener);

    return () => {
      document.removeEventListener('ionBackButton', listener);
    };
  }, [history]);
};

export default useSetupBackButton;
