import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { SignUpType } from '@/features/sign-up/sign-up';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export interface ProfileModel {
  name: string;
  birthdayWithGender: string;
  telecom: string;
  phoneNumber: string;
  email: string;
  signUpMethod: SignUpType;
}

export interface ProfileDTO {
  name: string;
  // yyyyMMdd
  birthday: string;
  gender: 'M' | 'F';
  telecom: string;
  phoneNumber: string;
  email: string;
  signUpMethodId: number;
}

// TODO. update endpoint
export const getProfileEndpoint = '/user/profile';

const useProfile = (
  options?: Omit<UseQueryOptions<ProfileModel>, 'queryFn' | 'queryKey'>
) => {
  return useQuery<ProfileModel>({
    ...options,
    queryKey: [getProfileEndpoint],
    queryFn: async () => {
      const response = await httpClient.get<ProfileDTO>(getProfileEndpoint);

      return {
        name: response.name,
        birthdayWithGender: `${response.birthday}${
          response.gender === 'M' ? '1' : '2'
        }`,
        telecom: response.telecom,
        phoneNumber: response.phoneNumber,
        email: response.email,
        signUpMethod: response.signUpMethodId,
      };
    },
  });
};

export default useProfile;

defineMock((mock) => {
  return [
    mock.get(getProfileEndpoint, () => {
      return HttpResponse.json({
        name: '홍길동',
        // yyyyMMdd
        birthday: '19900101',
        gender: 'M',
        telecom: 'KT',
        phoneNumber: '01012345678',
        email: 'supernovel@test.com',
        signUpMethodId: 0,
      });
    }),
  ];
});
