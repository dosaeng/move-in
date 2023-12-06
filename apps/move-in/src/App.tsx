import { IonApp, IonRouterOutlet } from '@move-in/move-in-design-system';
import { Route, Redirect } from 'react-router-dom';
import SignUp from './features/sign-up/SignUp';
import { IonReactRouter } from '@ionic/react-router';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" render={() => <Redirect to="/sign-up" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
