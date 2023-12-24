import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Button, TextField } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSignUpFormState } from '../hooks/useSignUpFormState';

const SignUpAccountInfoFormPage: React.FC = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<{
    email: string;
    password: string;
    re_password: string;
  }>();
  const { data, setData } = useSignUpFormState();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1
          className={css({
            textStyle: 'header-24-sb',
          })}
        >
          무브인을 시작하기 위해
          <br />
          회원가입을 해주세요
        </h1>

        <form
          onSubmit={handleSubmit((values) => {
            setData({ ...data, ...values });

            history.push('/sign-up/user-info');
          })}
        >
          <div
            className={css({
              paddingTop: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
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
            <TextField
              id="re_password"
              type="password"
              label="무브인 비밀번호 재확인"
              helperText={
                errors.re_password?.message ?? '비밀번호를 재입력해 주세요'
              }
              {...register('re_password', {
                required: true,
                minLength: 8,
                validate: (value) => {
                  return (
                    value === getValues('password') ||
                    '비밀번호가 일치하지 않습니다.'
                  );
                },
              })}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyItems: 'center',
              width: '100%',
              paddingTop: '48px',
            })}
          >
            <Button
              className={css({
                maxWidth: 'fit-content',
                color: 'text.light.04',
                textDecoration: 'underline',
                fontSize: '12px',
              })}
              type="button"
              size="xs"
              shape="clear"
              label="이미 아이디가 있어요"
              theme="neutral"
              onClick={() => {
                history.replace('/sign-in');
              }}
            />
          </div>
          <div
            className={css({
              position: 'absolute',
              left: '0',
              right: '0',
              bottom: '0',
              height: 'fit-content',
              backgroundColor: 'fill.light.01',
            })}
          >
            <Button
              type="submit"
              disabled={!isValid}
              className={css({
                width: '100%',
                maxWidth: '100%',
                borderRadius: '0',
              })}
              label={'다음'}
            />
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUpAccountInfoFormPage;
