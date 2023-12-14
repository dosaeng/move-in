import { Button, Modal } from '@move-in/move-in-design-system';
import { ProductFilterDetailModel } from '../hooks/useProductFilterDetail';
import { ProductFilterState } from '../hooks/useProductFilterList';
import { css } from '@move-in/styled-system/css';

enum ProductFilterDetailAction {
  EDIT = 'EDIT',
  STOP_REQUEST = 'STOP_REQUEST',
  DELETE = 'DELETE',
}

interface Props {
  data: ProductFilterDetailModel;
  isOpen?: boolean;
  onDidDismiss?: (action?: ProductFilterDetailAction) => void;
}

const ProductFilterDetailActionModal: React.FC<Props> = ({ data, isOpen, onDidDismiss }) => {
  return (
    <Modal isOpen={isOpen} onDidDismiss={() => onDidDismiss && onDidDismiss()}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '24px',
          width: '100%',
        })}
      >
        <div
          className={css({
            textStyle: 'header-18-sb',
            color: 'text.dark.04',
            textAlign: 'center',
          })}
        >
          {`‘${data.name}’에`}
          <br />
          {`어떤 작업을 하시겠어요?`}
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          })}
        >
          <Button
            shape="clear"
            label="수정하기"
            theme="neutral"
            onClick={() => {
              onDidDismiss && onDidDismiss(ProductFilterDetailAction.EDIT);
            }}
          />
          {data.state === ProductFilterState.REQUESTED && (
            <Button
              shape="clear"
              label="요청 중단하기"
              theme="neutral"
              onClick={() => {
                onDidDismiss && onDidDismiss(ProductFilterDetailAction.STOP_REQUEST);
              }}
            />
          )}
          <Button
            shape="clear"
            theme="negative"
            label="삭제하기"
            onClick={() => {
              onDidDismiss && onDidDismiss(ProductFilterDetailAction.DELETE);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductFilterDetailActionModal;
