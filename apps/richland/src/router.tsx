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
import ProfileEditPage from './features/profile/pages/ProfileEditPage';
import WithdrawalMemberPage from './features/profile/pages/WithdrawalMemberPage';
import TermsListPage from './features/terms/pages/TermsListPage';
import NotificationPage from './features/notification/pages/NotificationPage';
import UsageSelectPage from './features/search/pages/UsageSelectPage';
import SearchFormPage from './features/search/pages/SearchFormPage';

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
    path: '/service/profile',
    element: <ProfileEditPage />,
    loader: withAuthLoader(),
  },
  {
    path: '/service/profile/withdrawal',
    element: <WithdrawalMemberPage />,
    loader: withAuthLoader(),
  },
  {
    path: '/service/terms',
    element: <TermsListPage />,
    loader: withAuthLoader(),
  },
  {
    path: '/service/notification',
    element: <NotificationPage />,
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
    children: [
      {
        path: '',
        index: true,
        element: <SearchFormPage />,
      },
      {
        path: 'usage-select',
        element: <UsageSelectPage />,
      },
    ],
  },
]);
