import { Button, Popup } from '@move-in/design-system';

interface Props {
  isOpen?: boolean;
  onDidDismiss?: () => void;
}

const WithdrawalMemberSuccessPopup: React.FC<Props> = ({
  isOpen,
  onDidDismiss,
}) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      title={
        <>
          리치랜드 회원 탈퇴를
          <br />
          정상적으로 완료했어요
        </>
      }
      description={<>더욱 노력하는 리치랜드가 될게요</>}
      actions={<Button label="다음에 또 만나요!" onClick={onDidDismiss} />}
    />
  );
};

export default WithdrawalMemberSuccessPopup;
