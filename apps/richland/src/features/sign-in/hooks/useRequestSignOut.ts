import useAuthState from '@/common/hooks/useAuthState';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useRequestSignOut = (
  options?: Omit<UseMutationOptions<void, Error, void, unknown>, 'mutationFn'>
) => {
  const { unsetAuthData } = useAuthState();

  return useMutation({
    ...options,
    mutationFn: async () => {
      unsetAuthData();
    },
  });
};

export default useRequestSignOut;
