import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { IonApp } from '@ionic/react';

function App() {
  return (
    <IonApp>
      <RouterProvider router={router} />
    </IonApp>
  );
}

export default App;
