import { HttpClient } from "@move-in/core";
import { enableMock } from "./defineMock";

export const httpClient = new HttpClient({ baseUrl: import.meta.env.VITE_API_URL as string, enableMock });
