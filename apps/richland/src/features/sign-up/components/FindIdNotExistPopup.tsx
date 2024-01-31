import { Button, Popup, PopupProps } from '@move-in/design-system';

const FindIdNotExistPopup: React.FC<{
  isOpen: PopupProps['isOpen'];
  onDidDismiss?: PopupProps['onDidDismiss'];
  onConfirm?: () => void;
}> = ({ isOpen, onDidDismiss, onConfirm }) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      title="아직 가입된 계정이 없습니다"
      description="회원가입 후 다시 시도해주세요"
      actions={<Button label="돌아가기" size="m" onClick={onConfirm} />}
    />
  );
};

export default FindIdNotExistPopup;
