import logger from '@/common/utils/logger';
import { IonFooter, IonHeader, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  PageHeader,
  useToast,
} from '@move-in/design-system';
import { PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css, cx } from '@move-in/styled-system/css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WithdrawalMemberSuccessPopup from '../components/WithdrawalMemberSuccessPopup';
import useWithdrawalMember from '../hooks/useWithdrawalMember';

const WithdrawalMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
  const { mutate: requestWithdrawalMember, isLoading } = useWithdrawalMember({
    onSuccess: () => {
      setIsOpenSuccessPopup(true);
      navigate('/');
    },
    onError: (error) => {
      logger.error(error);
      toast.present('회원탈퇴에 실패했습니다.', 1000);
    },
  });

  return (
    <IonPage>
      <WithdrawalMemberSuccessPopup
        isOpen={isOpenSuccessPopup}
        onDidDismiss={() => {
          setIsOpenSuccessPopup(false);
        }}
      />
      <IonHeader className="ion-no-border">
        <PageHeader
          title="회원탈퇴"
          right={
            <PageHeaderCloseButton
              onClick={() => {
                navigate(-1);
              }}
            />
          }
        />
      </IonHeader>
      <div
        className={css({
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          paddingX: '20px',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <_Header />
        </div>
        <div
          className={css({
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'stroke.light.02',
            borderRadius: '16px',
            height: '180px',
            overflowY: 'auto',
            overflowX: 'hidden',
            textStyle: 'paragraph-14-r',
            color: 'text.dark.02',
            padding: '16px',
          })}
        >
          TODO. 탈퇴 시 주의사항 추가
        </div>
      </div>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock
          className={css({
            width: '100%',
          })}
        >
          <Button
            className={css({
              maxWidth: '100%',
            })}
            label="확인하고 탈퇴 요청하기"
            disabled={isLoading}
            onClick={requestWithdrawalMember}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default WithdrawalMemberPage;

const _Header: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }),
        className
      )}
    >
      <div
        className={css({
          position: 'relative',
          width: '200px',
          height: '152px',
        })}
      >
        <img
          src="/images/error-illust.png"
          className={css({
            position: 'absolute',
            width: '200px',
            height: '200px',
          })}
        />
      </div>
      <div
        className={css({
          textStyle: 'header-20-sb',
          color: 'text.dark.04',
        })}
      >
        정말 탈퇴 하시겠어요?
      </div>
      <div
        className={css({
          textStyle: 'body-16-m',
          color: 'text.dark.01',
        })}
      >
        아래 내용을 반드시 숙지해주세요
      </div>
    </div>
  );
};
