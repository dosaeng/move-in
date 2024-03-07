import { setupIonicReact } from '@ionic/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';

import KakaoLogin from '@/common/plugins/KakaoLoginPlugin.ts';
import logger from '@/common/utils/logger.ts';

import '@move-in/design-system/src/index.css';
import './index.css';

setupIonicReact({
  mode: 'md',
});

KakaoLogin.initialize({
  appKey: import.meta.env.VITE_KAKAO_NATIVE_APP_KEY,
}).catch(logger.error);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
