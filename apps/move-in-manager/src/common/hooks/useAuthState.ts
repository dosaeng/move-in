import { useQuery } from 'react-query';

export enum AuthState {
  unauthorized,
  authorized,
}

const useAuthState = () => {
  const { data, isLoading, refetch } = useQuery('authState', async () => {
    return localStorage.getItem('isSignIn')
      ? AuthState.authorized
      : AuthState.unauthorized;
  });

  return {
    data,
    isLoading,
    setSignInState() {
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
