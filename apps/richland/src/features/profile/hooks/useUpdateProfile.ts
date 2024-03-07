import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfileEndpoint } from './useProfile';

export interface UpdateProfileModel {
  email: string;
}

// TODO. update endpoint
const updateProfileEndpoint = '/user/profile';

const useUpdateProfile = (
  options?: Omit<
    UseMutationOptions<void, unknown, UpdateProfileModel>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, UpdateProfileModel>({
    ...options,
    mutationFn: async (data) => {
      await httpClient.patch(updateProfileEndpoint, {
        body: {
          email: data.email,
        },
      });

      queryClient.invalidateQueries(getProfileEndpoint);
    },
  });
};

export default useUpdateProfile;

defineMock((mock) => {
  mock.patch(updateProfileEndpoint, () => {
    return new Response('', { status: 200 });
  });
});
