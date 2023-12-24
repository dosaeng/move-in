import { UseMutationOptions, useMutation } from 'react-query';
import useAuthState from '@/common/hooks/useAuthState';

const useSignOut = (
  options?: Omit<UseMutationOptions<void, unknown, void, unknown>, 'mutationFn'>
) => {
  const { unsetSignInState } = useAuthState();

  return useMutation(async () => {
    unsetSignInState();
  }, options);
};

export default useSignOut;
