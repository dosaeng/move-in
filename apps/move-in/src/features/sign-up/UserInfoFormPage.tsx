import { useKeyboard } from '@capacitor-community/keyboard-react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Button, PageHeader, TextField } from '@move-in/move-in-design-system';
import { PageHeaderBackButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const UserInfoFormPage: React.FC = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    name: string;
    birthday: string;
    phone_number: string;
  }>();
  const { isOpen } = useKeyboard();
  const visibleSubmitButton = isOpen || isValid;

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

        <form onSubmit={handleSubmit(() => {})}>
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
              {...register('name', { required: true })}
            />
            <TextField
              id="birthday"
              type="number"
              label="생년월일 및 성별"
              helperText="생년월일 및 성별을 입력해주세요"
              {...register('birthday', { required: true })}
            />
            <TextField
              id="phone_number"
              type="phone"
              label="전화번호"
              helperText="전화번호를 입력해 주세요"
              {...register('phone_number', { required: true })}
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

export default UserInfoFormPage;
