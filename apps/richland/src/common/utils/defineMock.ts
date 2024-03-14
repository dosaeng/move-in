import { http, type RequestHandler } from 'msw';
import { setupWorker, type SetupWorker } from 'msw/browser';
export { HttpResponse } from 'msw';

const worker: SetupWorker = setupWorker();

const enable = import.meta.env.VITE_ENABLE_MOCK_API == 'true';

export const enableMocking = async () => {
  if (!enable) return;

  return worker.start();
};

export const defineMock = (
  handler: (mock: typeof http) => RequestHandler[]
) => {
  if (enable) {
    worker.use(...handler(http));
  }
};
