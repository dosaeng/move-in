import LoadingPage from '@/common/component/LoadingPage';
import useAuthState, { AuthState } from '@/common/hooks/useAuthState';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { SignUpContextProvider } from '../hooks/useSignUpFormState';
import SignUpAccountInfoFormPage from './SignUpAccountInfoFormPage';
import SignUpCompletePage from './SignUpCompletePage';
import SignUpUserInfoFormPage from './SignUpUserInfoFormPage';

const SignUpPage: React.FC = () => {
  const { data: authState, isLoading } = useAuthState();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (authState === AuthState.authorized) {
    return <Redirect to="/product-filters" />;
  }

  return (
    <SignUpContextProvider>
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
    </SignUpContextProvider>
  );
};

export default SignUpPage;
