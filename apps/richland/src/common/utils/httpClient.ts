import { HttpClient, HttpClientInspector } from '@move-in/core';
import { enableMock } from './defineMock';

export { HttpClientError } from '@move-in/core';

const baseUrl = import.meta.env.VITE_API_URL as string;

const mockInspector: HttpClientInspector = {
  request(request) {
    if (!enableMock) {
      return request;
    }

    return {
      ...request,
      url: request.url
        .toString()
        .replace(baseUrl, '')
        .replace(window.origin, ''),
    };
  },
};

export const httpClient = new HttpClient({
  baseUrl: import.meta.env.VITE_API_URL as string,
  inspectors: [mockInspector],
});
