import { Button, Popup } from '@move-in/design-system';

interface Props {
  filterName?: string;
  isOpen?: boolean;
  onDidDismiss?: (isAgree: boolean) => void;
}

const ProductSuggestionStopRequestPopup: React.FC<Props> = ({ filterName, isOpen, onDidDismiss }) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss?.(false);
      }}
      title={
        <>
          {filterName}에 대한
          <br />
          제안 요청을 중지하시겠어요?
        </>
      }
      actionsFlow="column"
      actions={[
        <Button onClick={() => onDidDismiss?.(true)} label="네, 중지할게요" />,
        <Button shape="clear" theme="neutral" onClick={() => onDidDismiss?.(false)} label="다음에 할께요" />,
      ]}
    />
  );
};

export default ProductSuggestionStopRequestPopup;
