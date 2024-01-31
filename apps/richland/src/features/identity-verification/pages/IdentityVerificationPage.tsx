import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  PageHeader,
  TextField,
} from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const IdentityVerificationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    name: string;
    phoneNumber: string;
  }>();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(() => {
        // TODO. 본인인증 로직 추가하기
      })}
    >
      <IonPage>
        <IonHeader className="ion-no-border">
          <PageHeader
            left={
              <PageHeaderBackButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
          ></PageHeader>
        </IonHeader>
        <IonContent
          className={css({
            '--padding-top': '24px',
            '--padding-start': '16px',
            '--padding-end': '16px',
            '--padding-bottom': '24px',
          })}
        >
          <h1
            className={css({
              textStyle: 'header-24-sb',
            })}
          >
            본인인증을 위해
            <br />
            아래 정보를 입력해주세요
          </h1>

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
              {...register('name', { required: true, pattern: /^[가-힣]+$/ })}
            />
            <TextField
              id="phoneNumber"
              type="phone"
              label="전화번호"
              helperText="전화번호를 입력해 주세요 (숫자만)"
              maxLength={11}
              {...register('phoneNumber', {
                required: true,
                minLength: 10,
                maxLength: 11,
              })}
            />
          </div>
        </IonContent>
        <IonFooter className="ion-no-border">
          <CTAButtonBlock>
            <Button
              className={css({ maxWidth: '100%' })}
              type="submit"
              disabled={!isValid}
              label={'인증 요청하기'}
            />
          </CTAButtonBlock>
        </IonFooter>
      </IonPage>
    </form>
  );
};

export default IdentityVerificationPage;
