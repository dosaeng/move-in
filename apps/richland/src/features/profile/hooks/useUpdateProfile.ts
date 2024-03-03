import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { getProfileEndpoint } from './useProfile';

export interface UpdateProfileModel {
  email: string;
}

const updateProfileEndpoint = '/user/profile';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, UpdateProfileModel>({
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
