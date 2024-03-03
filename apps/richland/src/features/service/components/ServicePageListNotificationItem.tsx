import { Toggle } from '@move-in/design-system';
import ServicePageListItem from './ServicePageListItem';
import useTermsAgreementState from '@/features/terms/hooks/useTermsAgreementState';
import { marketingTermsId } from '@/features/terms/constants';
import { css } from '@move-in/styled-system/css';
import useUpdateTermsAgreementState from '@/features/terms/hooks/useUpdateTermsAgreementState';
import NotificationStopConfirmPopup from './NotificationStopConfirmPopup';
import NotificationStateChangeDonePopup from './NotificationStateChangeDonePopup';
import { useState } from 'react';

const ServicePageListNotificationItem: React.FC = () => {
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
  const [isOpenDonePopup, setIsDonePopup] = useState(false);
  const [donePopupState, setDonePopupState] = useState(false);
  const { data, isLoading } = useTermsAgreementState(marketingTermsId);
  const { mutate: updateAgreement, isLoading: isLoadingUpdate } =
    useUpdateTermsAgreementState({
      onSuccess: (value) => {
        setDonePopupState(value);
        setIsDonePopup(true);
      },
    });
  const isDisabled = isLoading || isLoadingUpdate;

  const toggleAgreementState = () => {
    const nextValue = !(data?.isAgreed ?? false);

    if (!nextValue) {
      setIsOpenConfirmPopup(true);
      return;
    }

    updateAgreement({
      id: marketingTermsId,
      isAgreed: nextValue,
    });
  };

  return (
    <>
      <NotificationStopConfirmPopup
        isOpen={isOpenConfirmPopup}
        onDidDismiss={(isConfirm) => {
          if (isConfirm) {
            updateAgreement({
              id: marketingTermsId,
              isAgreed: false,
            });
          }

          setIsOpenConfirmPopup(false);
        }}
      />
      <NotificationStateChangeDonePopup
        isAgreed={donePopupState}
        isOpen={isOpenDonePopup}
        onDidDismiss={() => {
          setIsDonePopup(false);
        }}
      />
      <ServicePageListItem
        title="알림 설정"
        suffix={
          <div onClick={!isDisabled ? toggleAgreementState : undefined}>
            <Toggle
              className={css({
                pointerEvents: 'none',
              })}
              disabled={isDisabled}
              checked={data?.isAgreed ?? false}
            />
          </div>
        }
      />
    </>
  );
};

export default ServicePageListNotificationItem;
