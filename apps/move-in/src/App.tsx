import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import SignUpCompletePage from './features/sign-up/pages/SignUpCompletePage';
import SignUpPage from './features/sign-up/pages/SignUpPage';
import UserInfoFormPage from './features/sign-up/pages/UserInfoFormPage';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/sign-up/user-info" component={UserInfoFormPage} />
          <Route exact path="/sign-up/complete" component={SignUpCompletePage} />
          <Route exact path="/" render={() => <Redirect to="/sign-up" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
