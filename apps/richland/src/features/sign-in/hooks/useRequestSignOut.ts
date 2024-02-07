import useAuthState from '@/common/hooks/useAuthState';
import { UseMutationOptions, useMutation } from 'react-query';

const useRequestSignOut = (options?: Omit<
  UseMutationOptions<void, Error, void, unknown>,
  'mutationFn'
>) => {
  const { unsetAuthData } = useAuthState();

  return useMutation(async () => {
    unsetAuthData();
  }, options);
};

export default useRequestSignOut;
