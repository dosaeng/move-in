import {
  LifeCycleEventsMap,
  RequestHandler,
  SharedOptions,
  http,
  passthrough,
  type SetupApi,
} from 'msw';

export type MswParameters = {
  msw?:
    | RequestHandler[]
    | { handlers: RequestHandler[] | Record<string, RequestHandler> };
};

type Context = {
  parameters: MswParameters;
};

let api: {
  resetHandlers: SetupApi<LifeCycleEventsMap>['resetHandlers'];
  use: SetupApi<LifeCycleEventsMap>['use'];
};
let workerPromise: Promise<unknown>;

export async function initialize(options?: SharedOptions): Promise<void> {
  const defaultHandlers = [
    http.get('/hot-update/*', () => passthrough()),
    http.get('/node_modules/*', () => passthrough()),
  ];

  const { setupWorker } = await import('msw/browser');
  const worker = setupWorker(...defaultHandlers);
  workerPromise = worker.start(options);
  api = worker;
}

const setupHandlers = (msw: MswParameters['msw']) => {
  if (api) {
    api.resetHandlers();

    if (msw) {
      if (Array.isArray(msw) && msw.length > 0) {
        // Support an Array of request handlers (backwards compatibility).
        api.use(...msw);
      } else if ('handlers' in msw && msw.handlers) {
        // Support an Array named request handlers handlers
        // or an Object of named request handlers with named arrays of handlers
        const handlers = Object.values(msw.handlers)
          .filter(Boolean)
          .reduce(
            (handlers, handlersList) => handlers.concat(handlersList),
            [] as RequestHandler[]
          );

        if (handlers.length > 0) {
          api.use(...handlers);
        }
      }
    }
  }
};

export const mswLoader = async (context: Context) => {
  const {
    parameters: { msw },
  } = context;

  setupHandlers(msw);

  if (workerPromise) {
    await workerPromise;
  }

  return {};
};
