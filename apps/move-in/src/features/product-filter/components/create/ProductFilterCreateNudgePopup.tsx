import { Button, Popup } from '@move-in/design-system';

interface Props {
  isOpen?: boolean;
  onDidDismiss?: (isAgree: boolean) => void;
}

const ProductFilterCreateNudgePopup: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss?.(false);
      }}
      title={
        <>
          1분 만에 내가 살고 싶은 집의
          <br />
          희망 조건 입력해 보세요
        </>
      }
      description={
        <>
          <>
            원하는 조건에 부합하는 집을
            <br />
            중개인이 검토후 추천해 드려요
          </>
        </>
      }
      actionsFlow="column"
      actions={[
        <Button
          label="지금 바로 할게요"
          onClick={() => {
            onDidDismiss?.(true);
          }}
        />,
        <Button
          label="다음에 할게요"
          shape="clear"
          theme="neutral"
          onClick={() => {
            onDidDismiss?.(false);
          }}
        />,
      ]}
    />
  );
};

export default ProductFilterCreateNudgePopup;
