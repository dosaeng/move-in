import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { HttpClientError } from '@move-in/core';
import { useQuery } from '@tanstack/react-query';

export interface TermModel {
  id: number;
  title: string;
  url: string;
  required: boolean;
}

// TODO. API 연결하기
const termsEndpoint = '/terms';

const useTerms = () => {
  return useQuery<TermModel[], HttpClientError>({
    queryKey: [termsEndpoint],
    queryFn: async () => {
      const response = await httpClient.get<TermModel[]>(termsEndpoint);

      return response;
    },
  });
};

export default useTerms;

defineMock((mock) => {
  return [
    mock.get(termsEndpoint, () => {
      return HttpResponse.json([
        {
          id: 1,
          title: '리치랜드 서비스 이용약관',
          url: 'https://www.naver.com',
          required: true,
        },
        {
          id: 2,
          title: '개인정보 처리방침 동의',
          url: 'https://www.naver.com',
          required: true,
        },
        {
          id: 3,
          title: '만 14세 이상 입니다',
          url: 'https://www.naver.com',
          required: true,
        },
        {
          id: 4,
          title: '마케팅 수신 동의',
          url: 'https://www.naver.com',
          required: false,
        },
      ]);
    }),
  ];
});
