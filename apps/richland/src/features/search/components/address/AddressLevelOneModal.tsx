import useProductAddressList from '@/features/product/hooks/useProductAddressList';
import { ProductAddress } from '@/features/product/product';
import { IonSpinner } from '@ionic/react';
import { Modal, ModalProps } from '@move-in/design-system';
import { css, cva, cx } from '@move-in/styled-system/css';

interface Props extends Omit<ModalProps, 'trigger' | 'id' | 'ref'> {
  className?: string;
  selectedItems?: ProductAddress[];
  onClickItem?: (item: ProductAddress) => void;
}

/**
 * 주소 레벨 1에 대한 선택 모달
 */
const AddressLevelOneModal: React.FC<Props> = ({
  className,
  onDidDismiss,
  isOpen,
  selectedItems,
  onClickItem,
}) => {
  const { data, isLoading } = useProductAddressList({ level: 1, size: 100 });

  return (
    <Modal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <div
        className={cx(
          css({
            width: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
          }),
          className
        )}
      >
        {isLoading ? (
          <div
            className={css({
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '16px',
            })}
          >
            <IonSpinner color="primary" />
          </div>
        ) : (
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              paddingX: '24px',
              paddingY: '16px',
            })}
          >
            {data?.pages?.flatMap(({ list: items }) =>
              items.map((item) => (
                <AddressItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems?.some(
                    (selected) => selected.id === item.id
                  )}
                  onClick={() => {
                    onClickItem?.(item);
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddressLevelOneModal;

const AddressItem = ({
  item,
  onClick,
  isSelected = false,
  isDisabled = false,
}: {
  item: ProductAddress;
  onClick?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <div
      className={cva({
        base: {
          padding: '12px 20px',
          cursor: 'pointer',
          borderColor: 'stroke.light.02',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderRadius: '12px',
          textStyle: 'body-14-m',
          color: 'text.dark.04',
        },
        variants: {
          isSelected: {
            true: {
              borderColor: 'brand.purple.03',
              color: 'brand.purple.03',
              textStyle: 'body-14-sb',
            },
          },
          isDisabled: {
            true: {
              border: 'none',
              backgroundColor: 'fill.light.02',
              color: 'text.light.04',
            },
          },
        },
      })({
        isSelected,
        isDisabled,
      })}
      onClick={!isDisabled ? onClick : undefined}
    >
      {item.levelOneName}
    </div>
  );
};
