import { Button, Modal } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';

interface Props {
  agentName?: string;
  isOpen?: boolean;
  onDidDismiss?: (isAgree: boolean) => void;
}

const ProductConsultingRequestModal: React.FC<Props> = ({ agentName, isOpen, onDidDismiss }) => {
  return (
    <Modal
      isOpen={isOpen}
      onDidDismiss={() => {
        if (!isOpen) return;

        onDidDismiss?.(false);
      }}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          width: '100%',
          paddingX: '20px',
          paddingBottom: '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
            해당 상품에 대해
            <br />
            상담을 신청 하시겠어요?
          </div>
          <div
            className={css({
              textStyle: 'body-14-r',
              color: 'text.dark.02',
              textAlign: 'center',
            })}
          >
            {agentName} 중개사가 상담 가능 일정을
            <br />
            개별적으로 연락을 드릴거에요
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <Button onClick={() => onDidDismiss?.(true)} label="네, 신청할게요" />
          <Button shape="clear" theme="neutral" onClick={() => onDidDismiss?.(false)} label="다음에 이어할게요" />
        </div>
      </div>
    </Modal>
  );
};

export default ProductConsultingRequestModal;
