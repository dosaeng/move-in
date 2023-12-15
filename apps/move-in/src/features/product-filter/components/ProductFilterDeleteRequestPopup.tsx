import { Button, Popup } from '@move-in/move-in-design-system';

interface Props {
  filterName?: string;
  isOpen?: boolean;
  onDidDismiss?: (isAgree: boolean) => void;
}

const ProductFilterDeleteRequestPopup: React.FC<Props> = ({ filterName, isOpen, onDidDismiss }) => {
  return (
    <Popup
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss?.(false);
      }}
      title={
        <>
          {filterName}를
          <br />
          삭제하시겠어요?
        </>
      }
      actionsFlow="column"
      actions={[
        <Button onClick={() => onDidDismiss?.(true)} label="네, 삭제할게요" />,
        <Button shape="clear" theme="neutral" onClick={() => onDidDismiss?.(false)} label="다음에 할께요" />,
      ]}
    />
  );
};

export default ProductFilterDeleteRequestPopup;
