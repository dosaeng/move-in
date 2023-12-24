import LoadingPage from '@/common/component/LoadingPage';
import useSignOut from '../hooks/useSignOut';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SignOutPage: React.FC = () => {
  const history = useHistory();
  const { mutate: requestSignOut } = useSignOut({
    onSuccess: () => {
      history.replace('/');
    },
  });

  useEffect(() => {
    requestSignOut();
  }, [requestSignOut]);

  return <LoadingPage />;
};

export default SignOutPage;
