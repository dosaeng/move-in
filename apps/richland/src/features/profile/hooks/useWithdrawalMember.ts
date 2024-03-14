import useAuthState from '@/common/hooks/useAuthState';
import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

// TODO. update endpoint
const withdrawalMemberEndpoint = '/user/withdrawal';

const useWithdrawalMember = (
  options?: Omit<UseMutationOptions, 'mutationFn'>
) => {
  const { unsetAuthData } = useAuthState();

  return useMutation({
    ...options,
    mutationFn: async () => {
      await httpClient.post(withdrawalMemberEndpoint);

      unsetAuthData();
    },
  });
};

export default useWithdrawalMember;

defineMock((mock) => {
  return [
    mock.post(withdrawalMemberEndpoint, () => {
      return HttpResponse.json({});
    }),
  ];
});
