import { useQuery } from 'react-query';
import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom';

export enum AuthState {
  requireSignUp,
  unauthorized,
  authorized,
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
}

const fetchAuthState = async () => {
  return localStorage.getItem('accessToken')
    ? AuthState.authorized
    : AuthState.unauthorized;
};

export const withAuthLoader = (loader?: LoaderFunction) => {
  return async (args: LoaderFunctionArgs) => {
    const authState = await fetchAuthState();

    if (authState === AuthState.authorized) {
      if (loader == null) return null;

      return await loader(args);
    }

    return redirect('/sign-up');
  };
};

export const withoutAuthLoader = (loader?: LoaderFunction) => {
  return async (args: LoaderFunctionArgs) => {
    const authState = await fetchAuthState();

    if (authState === AuthState.authorized) {
      return redirect('/');
    }

    if (loader == null) return null;

    return await loader(args);
  };
};

const useAuthState = () => {
  const { data, isLoading, refetch } = useQuery('authState', fetchAuthState);

  return {
    data,
    isLoading,
    setAuthData(data: AuthData) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      refetch();
    },
    unsetAuthData({ skipRefetch = false }: { skipRefetch?: boolean } = {}) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      if (skipRefetch) return;

      refetch();
    },
  };
};

export default useAuthState;
