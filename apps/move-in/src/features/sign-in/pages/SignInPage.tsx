import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import {
  Button,
  PageHeader,
  TextField,
  useToast,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';

const SignInPage: React.FC = () => {
  const history = useHistory();
  const { present } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    email: string;
    password: string;
  }>();
  const { mutate: requestSignIn } = useSignIn({
    onSuccess: () => {
      history.replace('/product-filters');
    },
    onError: () => {
      present('로그인에 실패했습니다.', 300);
    },
  });

  return (
    <IonPage>
      <IonToolbar>
        <PageHeader />
      </IonToolbar>

      <IonContent className="move-in-padding">
        <h1
          className={css({
            textStyle: 'header-24-sb',
            marginBottom: '48px',
          })}
        >
          무브인을 시작하기 위해
          <br />
          로그인을 해주세요
        </h1>
        <form
          onSubmit={handleSubmit((values) => {
            requestSignIn(values);
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            })}
          >
            <TextField
              id="email"
              type="email"
              label="이메일 주소"
              helperText="이메일 주소를 입력해 주세요"
              {...register('email', { required: true })}
            />
            <TextField
              id="password"
              type="password"
              label="무브인 비밀번호"
              helperText="사용하실 비밀번호를 입력해주세요 (8자 이상)"
              {...register('password', { required: true, minLength: 8 })}
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid}
            className={css({
              position: 'absolute',
              left: '0',
              right: '0',
              bottom: '0',
              width: '100%',
              maxWidth: '100%',
              borderRadius: '0',
            })}
            label={'다음'}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;
