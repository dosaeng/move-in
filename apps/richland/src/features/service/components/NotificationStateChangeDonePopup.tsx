import { Popup } from '@move-in/design-system';
import { PopupViewButton } from '@move-in/design-system/src/popup/Popup';
import { format as formatDate } from 'date-fns';
import { useMemo } from 'react';

interface Props {
  // isAgreed가 true면 동의, false면 철회 문구를 보여준다.
  isAgreed: boolean;
  isOpen?: boolean;
  onDidDismiss?: () => void;
}

const NotificationStateChangeDonePopup: React.FC<Props> = ({
  isAgreed,
  isOpen,
  onDidDismiss,
}) => {
  const appliedAt = useMemo(() => {
    try {
      return formatDate(new Date(), 'yyyy년 MM월 dd일 HH시 mm분');
    } catch (e) {
      console.error(e);
      return '약관에';
    }
  }, []);

  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      title={
        <>
          마케팅 정보 수신 약관에
          <br />
          {isAgreed ? '동의하셨습니다' : '철회하셨습니다'}
        </>
      }
      description={`${appliedAt}에 ${isAgreed ? '동의' : '거부'}`}
      actions={
        <PopupViewButton
          label="확인"
          size="m"
          onClick={() => onDidDismiss && onDidDismiss()}
        />
      }
    />
  );
};

export default NotificationStateChangeDonePopup;
