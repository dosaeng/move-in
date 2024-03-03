import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { SignUpType } from '@/features/sign-up/sign-up';
import { UseQueryOptions, useQuery } from 'react-query';

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
  options?: Omit<
    UseQueryOptions<ProfileModel>,
    'queryFn' | 'queryKey'
  >
) => {
  return useQuery<ProfileModel>(
    getProfileEndpoint,
    async () => {
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
    options
  );
};

export default useProfile;

defineMock((mock) => {
  mock.get(getProfileEndpoint, () => {
    return new Response(
      JSON.stringify({
        name: '홍길동',
        // yyyyMMdd
        birthday: '19900101',
        gender: 'M',
        telecom: 'KT',
        phoneNumber: '01012345678',
        email: 'supernovel@test.com',
        signUpMethodId: 0,
      }),
      { status: 200 }
    );
  });
});
