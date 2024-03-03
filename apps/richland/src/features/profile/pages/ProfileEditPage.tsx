import { emailRegExp } from '@/common/utils/validator';
import { signUpTypeToMethodString } from '@/features/profile/profile';
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSpinner,
} from '@ionic/react';
import { Button, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BirthdayGenderField from '../components/BirthdayGenderField';
import EmailField from '../components/EmailFIeld';
import NameField from '../components/NameField';
import PhoneNumberField from '../components/PhoneNumberField';
import SignUpMethodField from '../components/SignUpMethodField';
import useProfile from '../hooks/useProfile';
import useUpdateProfile, {
  UpdateProfileModel,
} from '../hooks/useUpdateProfile';

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<UpdateProfileModel>();
  const { data, isLoading } = useProfile({
    onSuccess: (data) => {
      reset({ email: data.email });
    },
  });
  const { mutate: updateProfile, isLoading: isLoadingUpdate } =
    useUpdateProfile();
  const visibleEditButton = isDirty && !isLoadingUpdate;

  const submitHandler = (data: UpdateProfileModel) => {
    updateProfile(data);
  };

  const navigateToIdentityVerification = () => {
    if (isLoading) return;

    navigate('/profile/identity-verification');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                navigate('/');
              }}
            />
          }
        />
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <h2
            className={css({
              textStyle: 'header-26-b',
              color: 'text.dark.04',
              marginBottom: '40px',
            })}
          >
            회원 정보 수정
          </h2>
          {isLoading ? (
            <div
              className={css({
                width: '100%',
                height: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <IonSpinner name="crescent" />
            </div>
          ) : (
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
              })}
            >
              <NameField
                value={data?.name}
                onClick={navigateToIdentityVerification}
              />
              <BirthdayGenderField
                value={data?.birthdayWithGender}
                onClick={navigateToIdentityVerification}
              />
              <PhoneNumberField
                telecom={data?.telecom}
                phoneNumber={data?.phoneNumber}
                onClick={navigateToIdentityVerification}
              />
              <EmailField
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: emailRegExp,
                    message: '이메일 형식이 올바르지 않습니다',
                  },
                })}
                disabled={isLoadingUpdate}
                errorText={errors.email?.message}
              />
              <SignUpMethodField
                value={signUpTypeToMethodString(data?.signUpMethod, {
                  defaultString: 'OOO로 가입',
                })}
              />
            </div>
          )}
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        {visibleEditButton && (
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
              borderRadius: '0',
            })}
            label="수정을 완료했어요"
            onClick={handleSubmit(submitHandler)}
          />
        )}
      </IonFooter>
    </IonPage>
  );
};

export default ProfileEditPage;
