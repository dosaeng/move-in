import { App } from '@capacitor/app';
import { useQuery } from '@tanstack/react-query';

const useAppVersion = () => {
  return useQuery({
    queryKey: ['appVersion'],
    queryFn: async () => {
      try {
        const info = await App.getInfo();

        return `${info.version}(${info.build})`;
      } catch (error) {
        return import.meta.env.PACKAGE_VERSION ?? '';
      }
    },
  });
};

export default useAppVersion;
