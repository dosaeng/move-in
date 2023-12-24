import { useQuery } from 'react-query';

export enum AuthState {
  requireSignUp,
  unauthorized,
  authorized,
}

const useAuthState = () => {
  const { data, isLoading, refetch } = useQuery('authState', async () => {
    if (!localStorage.getItem('isSignUp')) {
      return AuthState.requireSignUp;
    }

    return localStorage.getItem('isSignIn')
      ? AuthState.authorized
      : AuthState.unauthorized;
  });

  return {
    data,
    isLoading,
    setSignUpState() {
      localStorage.setItem('isSignUp', 'true');

      refetch();
    },
    setSignInState() {
      localStorage.setItem('isSignUp', 'true');
      localStorage.setItem('isSignIn', 'true');

      refetch();
    },
    unsetSignInState() {
      localStorage.removeItem('isSignIn');

      refetch();
    },
  };
};

export default useAuthState;
