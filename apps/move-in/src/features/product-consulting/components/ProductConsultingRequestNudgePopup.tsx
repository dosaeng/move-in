import { Button, Popup } from '@move-in/move-in-design-system';

interface Props {
  isOpen?: boolean;
  onDidDismiss?: (isAgree: boolean) => void;
}

const ProductConsultingRequestNudgePopup: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss?.(false);
      }}
      title="잊지 않고 서둘러주세요!"
      description={
        <>
          해당 상품을 다른 고객이
          <br />
          먼저 계약할 수 있어요
        </>
      }
      actionsFlow='column'
      actions={[
        <Button onClick={() => onDidDismiss?.(true)} label="지금 상담 요청 할게요" />,
        <Button shape="clear" theme="neutral" onClick={() => onDidDismiss?.(false)} label="잊지 않고 다음에 할게요" />,
      ]}
    />
  );
};

export default ProductConsultingRequestNudgePopup;
