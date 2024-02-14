import { createBrowserRouter } from 'react-router-dom';
import { withAuthLoader, withoutAuthLoader } from './common/hooks/useAuthState';
import HomePage from './features/home/pages/HomePage';
import SearchPage from './features/search/pages/SearchPage';
import SignUpCompletePage from './features/sign-up/pages/SignUpCompletePage';
import SignUpTermsPage from './features/sign-up/pages/SignUpTermsPage';
import SignUpPage from './features/sign-up/pages/SignUpPage';
import SignUpErrorPage from './features/sign-up/pages/SignUpErrorPage';
import IdentityVerificationPage from './features/identity-verification/pages/IdentityVerificationPage';
import ServicePage from './features/service/pages/ServicePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: withAuthLoader(),
  },
  {
    path: '/service',
    element: <ServicePage />,
    loader: withAuthLoader(),
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    loader: withoutAuthLoader(),
  },
  {
    path: '/sign-up/terms',
    element: <SignUpTermsPage />,
    loader: withoutAuthLoader(),
  },
  {
    path: '/sign-up/complete',
    element: <SignUpCompletePage />,
    loader: withoutAuthLoader(),
  },
  {
    path: '/sign-up/error',
    element: <SignUpErrorPage />,
    loader: withoutAuthLoader(),
  },
  {
    path: '/identity-verification',
    element: <IdentityVerificationPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
    loader: withAuthLoader(),
  },
]);
