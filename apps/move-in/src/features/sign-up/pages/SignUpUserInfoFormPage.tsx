import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Button, PageHeader, TextField, useToast } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import SignUpTermsModal from '../components/SignUpTermsModal';
import { useSignUpFormState } from '../hooks/useSignUpFormState';
import useSignUp from '../hooks/useSignUp';

const SignUpUserInfoFormPage: React.FC = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    name: string;
    birthday: string;
    phoneNumber: string;
  }>();
  const { present } = useToast();
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);
  const { data, setData } = useSignUpFormState();
  const { isLoading: isLoadingSignUp, mutate: requestSignUp } = useSignUp({
    onSuccess: () => {
      history.push('/sign-up/complete');
    },
    onError: () => {
      present('회원가입에 실패했습니다.', 500);
    },
  });

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <PageHeader
            left={
              <PageHeaderBackButton
                onClick={() => {
                  history.goBack();
                }}
              />
            }
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1
          className={css({
            textStyle: 'header-24-sb',
          })}
        >
          원활한 서비스 이용을 위해
          <br />
          아래 정보를 입력해주세요
        </h1>

        <form
          onSubmit={handleSubmit((values) => {
            if (isLoadingSignUp) return;

            setData({ ...data, ...values });
            setIsOpenTermsModal(true);
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
              id="name"
              type="text"
              label="한글 이름"
              helperText="한글 이름을 입력해주세요"
              disabled={isLoadingSignUp}
              {...register('name', { required: true, pattern: /^[가-힣]+$/ })}
            />
            <TextField
              id="birthday"
              type="number"
              label="생년월일 및 성별"
              helperText="생년월일 및 성별을 입력해주세요 (예: 9302221)"
              maxLength={7}
              disabled={isLoadingSignUp}
              {...register('birthday', { required: true, minLength: 7, maxLength: 7 })}
            />
            <TextField
              id="phoneNumber"
              type="phone"
              label="전화번호"
              helperText="전화번호를 입력해 주세요 (숫자만)"
              maxLength={11}
              disabled={isLoadingSignUp}
              {...register('phoneNumber', { required: true, minLength: 10, maxLength: 11 })}
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid || isLoadingSignUp}
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
        <SignUpTermsModal
          isOpen={isOpenTermsModal}
          onDidDismiss={async (isAgree) => {
            setIsOpenTermsModal(false);

            if (!isAgree) {
              return;
            }

            requestSignUp(data!);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUpUserInfoFormPage;
