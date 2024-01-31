import { createBrowserRouter } from 'react-router-dom';
import { withAuthLoader, withoutAuthLoader } from './common/hooks/useAuthState';
import HomePage from './features/home/pages/HomePage';
import SearchPage from './features/search/pages/SearchPage';
import SignUpIdentityVerificationPage from './features/sign-up/pages/SignUpIdentityVerificationPage';
import SignUpPage from './features/sign-up/pages/SignUpPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: withAuthLoader(),
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    loader: withoutAuthLoader(),
  },
  {
    path: '/sign-up/identity-verification',
    element: <SignUpIdentityVerificationPage />,
    loader: withoutAuthLoader(),
  },
  {
    path: '/search',
    element: <SearchPage />,
    loader: withAuthLoader(),
  },
]);
