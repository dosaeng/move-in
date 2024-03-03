import logger from '@/common/utils/logger';
import { emailRegExp } from '@/common/utils/validator';
import { signUpTypeToMethodString } from '@/features/profile/profile';
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSpinner,
} from '@ionic/react';
import { Button, PageHeader, useToast } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BirthdayGenderField from '../components/BirthdayGenderField';
import EmailField from '../components/EmailFIeld';
import NameField from '../components/NameField';
import PhoneNumberField from '../components/PhoneNumberField';
import SignUpMethodField from '../components/SignUpMethodField';
import useProfile, { ProfileModel } from '../hooks/useProfile';
import useUpdateProfile, {
  UpdateProfileModel,
} from '../hooks/useUpdateProfile';

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();

  const formState = useForm<UpdateProfileModel>();
  const {
    reset,
    formState: { isDirty },
  } = formState;
  const { data, isLoading } = useProfile({
    onSuccess: (data) => {
      reset({ email: data.email });
    },
  });
  const visibleEditButton = isDirty;

  const navigateToIdentityVerification = () => {
    if (isLoading) return;

    navigate('/profile/identity-verification');
  };

  return (
    <FormProvider {...formState}>
      <IonPage>
        <IonHeader className="ion-no-border">
          <PageHeader
            left={
              <PageHeaderBackButton
                onClick={() => {
                  navigate('/service');
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
              <div>
                <_FormBody
                  data={data}
                  onNavigateToIdentityVerification={
                    navigateToIdentityVerification
                  }
                />
                <div
                  className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    marginY: '60px',
                  })}
                >
                  <Button
                    label="회원 탈퇴하기"
                    size="s"
                    shape="outline"
                    theme="neutral"
                    onClick={() => {
                      navigate('/service/profile/withdrawal');
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </IonContent>
        <IonFooter className="ion-no-border">
          {visibleEditButton && <_ProfileUpdateButton />}
        </IonFooter>
      </IonPage>
    </FormProvider>
  );
};

export default ProfileEditPage;

const _FormBody = ({
  data,
  onNavigateToIdentityVerification,
}: {
  data?: ProfileModel;
  onNavigateToIdentityVerification: () => void;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateProfileModel>();
  const { isLoading: isLoadingUpdate } = useUpdateProfile();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      })}
    >
      <NameField
        value={data?.name}
        onClick={onNavigateToIdentityVerification}
      />
      <BirthdayGenderField
        value={data?.birthdayWithGender}
        onClick={onNavigateToIdentityVerification}
      />
      <PhoneNumberField
        telecom={data?.telecom}
        phoneNumber={data?.phoneNumber}
        onClick={onNavigateToIdentityVerification}
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
  );
};

const _ProfileUpdateButton = () => {
  const toast = useToast();
  const { handleSubmit } = useFormContext<UpdateProfileModel>();
  const { mutate: updateProfile, isLoading: isLoadingUpdate } =
    useUpdateProfile({
      onError: (error) => {
        logger.error(error);
        toast.present('회원정보 업데이트에 실패했습니다.', 1000);
      },
    });

  return (
    <Button
      className={css({
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0',
      })}
      label="수정을 완료했어요"
      disabled={isLoadingUpdate}
      onClick={handleSubmit((data) => updateProfile(data))}
    />
  );
};
