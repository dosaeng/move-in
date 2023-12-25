import { App } from '@capacitor/app';
import { useIonBackButton } from '@move-in/core';
import { useHistory } from 'react-router-dom';

const useSetupBackButton = () => {
  const history = useHistory();

  useIonBackButton((event) => {
    event.detail.register(0, (processNextHandler) => {
      history.goBack();
      processNextHandler();
    });

    event.detail.register(-1, () => {
      if (
        window.location.pathname === '/sign-in' ||
        window.location.pathname === '/tabs/product-filters'
      ) {
        App.exitApp();
      }
    });
  });
};

export default useSetupBackButton;
