import type { FetchMockStatic } from "fetch-mock";

export const defineMock = (handler: (mock: FetchMockStatic) => void) => {
  if (import.meta.env.VITE_ENABLE_MOCK_API == 'true') {
    const fetchMock = import("fetch-mock");

    fetchMock.then(({ default: mock }) => {
      handler(mock);
    });
  }
}
