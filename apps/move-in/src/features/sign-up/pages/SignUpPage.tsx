import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import SignUpAccountInfoFormPage from './SignUpAccountInfoFormPage';
import SignUpCompletePage from './SignUpCompletePage';
import SignUpUserInfoFormPage from './SignUpUserInfoFormPage';

const SignUpPage: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Redirect exact path="/sign-up" to="/sign-up/account-info" />
        <Route exact path="/sign-up/account-info">
          <SignUpAccountInfoFormPage />
        </Route>
        <Route exact path="/sign-up/user-info">
          <SignUpUserInfoFormPage />
        </Route>
        <Route exact path="/sign-up/complete">
          <SignUpCompletePage />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default SignUpPage;
