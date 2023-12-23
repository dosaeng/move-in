import { HttpClient, HttpClientInspector } from "@move-in/core";
import { enableMock } from "./defineMock";

const mockInspector: HttpClientInspector = {
  request(request) {
    if (!enableMock) {
      return request;
    }

    return {
      ...request,
      url: request.url.toString().replace(import.meta.env.VITE_API_URL as string, '')
    }
  },
};


export const httpClient = new HttpClient({ baseUrl: import.meta.env.VITE_API_URL as string, inspectors: [mockInspector] });
