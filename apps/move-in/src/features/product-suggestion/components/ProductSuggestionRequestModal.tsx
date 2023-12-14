import { Button, Modal } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';

interface Props {
  filterName: string;
  isOpen: boolean;
  onDidDismiss: (isAgree: boolean) => void;
}

const ProductSuggestionRequestModal: React.FC<Props> = ({ filterName, isOpen, onDidDismiss }) => {
  return (
    <Modal
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss(false);
      }}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '32px',
          paddingX: '24px',
          paddingBottom: '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          })}
        >
          <div
            className={css({
              textStyle: 'header-18-sb',
              color: 'text.dark.04',
              textAlign: 'center',
            })}
          >
            ‘{filterName}’로
            <br />
            제안 요청을 하시겠어요?
          </div>
          <div
            className={css({
              textStyle: 'body-14-r',
              color: 'text.dark.02',
              textAlign: 'center',
            })}
          >
            파트너 중개사들이 매물 검토후
            <br />
            1주일 간 좋은 제안을 보내드려요
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '8px',
          })}
        >
          <Button onClick={() => onDidDismiss(true)} label="네, 제안해주세요" />
          <Button shape="clear" theme="neutral" onClick={() => onDidDismiss(false)} label="다음에 이어할게요" />
        </div>
      </div>
    </Modal>
  );
};

export default ProductSuggestionRequestModal;
