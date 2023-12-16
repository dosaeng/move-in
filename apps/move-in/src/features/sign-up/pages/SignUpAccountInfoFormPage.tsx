import { useKeyboard } from '@capacitor-community/keyboard-react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Button, TextField } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const SignUpAccountInfoFormPage: React.FC = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    email: string;
    password: string;
    re_password: string;
  }>();
  const { isOpen } = useKeyboard();
  const visibleSubmitButton = isOpen || isValid;

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
          onSubmit={handleSubmit(() => {
            // TODO. 데이터 저장

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
              helperText="사용하실 비밀번호를 입력해주세요"
              {...register('password', { required: true })}
            />
            <TextField
              id="re_password"
              type="password"
              label="무브인 비밀번호 재확인"
              helperText="비밀번호를 재입력해 주세요"
              {...register('re_password', { required: true })}
            />
          </div>
          {visibleSubmitButton && (
            <Button
              type="submit"
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
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUpAccountInfoFormPage;
