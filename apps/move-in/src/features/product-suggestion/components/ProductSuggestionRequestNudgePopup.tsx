import { Button, Popup } from '@move-in/design-system';

interface Props {
  isOpen: boolean;
  onDidDismiss: (isAgree: boolean) => void;
}

const ProductSuggestionRequestNudgePopup: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss(false);
      }}
      title={
        <>
          제안 요청을 하지 않으면
          <br />
          매물 추천을 받을 수 없어요
        </>
      }
      actionsFlow="column"
      actions={[
        <Button
          label="지금 제안 요청 할게요"
          onClick={() => {
            onDidDismiss(true);
          }}
        />,
        <Button
          label="잊지 않고 다음에 할게요"
          shape="clear"
          theme="neutral"
          onClick={() => {
            onDidDismiss(false);
          }}
        />,
      ]}
    />
  );
};

export default ProductSuggestionRequestNudgePopup;
