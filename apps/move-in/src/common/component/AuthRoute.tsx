import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuthState, { AuthState } from '../hooks/useAuthState';
import LoadingPage from './LoadingPage';

const AuthRoute = <Path extends string = string>({ component: Component, ...rest }: RouteProps<Path>) => {
  const { data: authState, isLoading: isLoadingAuthState } = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoadingAuthState) {
          return <LoadingPage />;
        }

        if (authState === AuthState.authorized) {
          if (rest.render) {
            return rest.render(props);
          } else if (Component != null) {
            return <Component {...props} />;
          } else {
            return rest.children as React.ReactNode;
          }
        }

        return (
          <Redirect
            to={{
              pathname: '/sign-up',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default AuthRoute;
