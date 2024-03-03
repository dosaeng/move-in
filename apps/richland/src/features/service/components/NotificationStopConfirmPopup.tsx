import { Popup } from '@move-in/design-system';
import { PopupViewButton } from '@move-in/design-system/src/popup/Popup';

interface Props {
  isOpen?: boolean;
  onDidDismiss?: (isConfirm: boolean) => void;
}

const NotificationStopConfirmPopup: React.FC<Props> = ({
  isOpen,
  onDidDismiss,
}) => {
  const onClose = (isConfirm: boolean) => {
    onDidDismiss && onDidDismiss(isConfirm);
  };

  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={() => onClose(false)}
      title={
        <>
          서비스 푸시 알림을 정말
          <br />
          그만 받으실 건가요?
        </>
      }
      description="이벤트 알림 등을 받으실 수 없어요"
      actions={
        <>
          <PopupViewButton
            theme="neutral"
            shape="clear"
            label="취소하기"
            size="m"
            onClick={() => onClose(false)}
          />
          <PopupViewButton
            label="알림 끄기"
            size="m"
            onClick={() => onClose(true)}
          />
        </>
      }
    />
  );
};

export default NotificationStopConfirmPopup;
