import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';

import '@move-in/move-in-design-system/src/index.scss';
import './index.scss';

setupIonicReact({
  mode: 'md',
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
