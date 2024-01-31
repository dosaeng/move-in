import { default as fetchMock, type FetchMockStatic } from 'fetch-mock';

export const enableMock = import.meta.env.VITE_ENABLE_MOCK_API == 'true';

export const defineMock = (handler: (mock: FetchMockStatic) => void) => {
  if (enableMock) {
    handler(fetchMock);
  }
};
