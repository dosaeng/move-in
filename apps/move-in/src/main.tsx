import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { setupIonicReact } from '@ionic/react';

import '@move-in/move-in-design-system/src/index.scss';
import './index.scss';

setupIonicReact({
  mode: 'md',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
