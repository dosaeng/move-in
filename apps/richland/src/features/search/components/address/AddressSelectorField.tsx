import { ProductAddress } from '@/features/product/product';
import { css, cx } from '@move-in/styled-system/css';
import useGroupProductAddressList from '../../hooks/useGroupProductAddressList';
import ChipList from '../ChipList';
import FormFieldLabel from '../FormFieldLabel';
import { IconChevronRight, IconCircleXFilled } from '@move-in/design-system';

interface Props {
  className?: string;
  selectedItems?: ProductAddress[];
  onClickHeader?: () => void;
  onClickGroupHeader?: (item: ProductAddress) => void;
  onClickDelete?: (item: ProductAddress) => void;
}

const AddressSelectorField: React.FC<Props> = ({
  className,
  selectedItems = [],
  onClickHeader,
  onClickGroupHeader,
  onClickDelete,
}) => {
  const hasSelectedItems = selectedItems.length > 0;
  const groupedItems = useGroupProductAddressList({ items: selectedItems });

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        })
      )}
    >
      <FormFieldLabel
        title="지역"
        caption="중복선택 가능"
        onClick={onClickHeader}
        leftIcon={
          <IconChevronRight
            className={css({
              color: 'text.light.04',
            })}
            size={20}
          />
        }
      />
      {hasSelectedItems &&
        groupedItems
          .map((groupedItem) => {
            return (
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                })}
              >
                <AddressGroupHeader
                  onClick={() => {
                    onClickGroupHeader?.(groupedItem.value);
                  }}
                  onClickDelete={() => {
                    onClickDelete?.(groupedItem.value);
                  }}
                >
                  {groupedItem.value.levelOneName}
                </AddressGroupHeader>
                {groupedItem.children.length > 0 && (
                  <ChipList
                    items={groupedItem.children}
                    labelGetter={(item) => item.levelTwoName}
                    onClickDelete={(item) => {
                      onClickDelete?.(item);
                    }}
                  />
                )}
              </div>
            );
          })
          .reduce((result, element) => {
            if (result.length !== 0) {
              result.push(
                <hr
                  className={css({
                    borderStyle: 'dashed',
                    borderColor: 'stroke.light.02',
                  })}
                />
              );
            }

            result.push(element);

            return result;
          }, [] as React.ReactNode[])}
    </div>
  );
};

export default AddressSelectorField;

function AddressGroupHeader({
  children,
  onClick,
  onClickDelete,
}: React.PropsWithChildren<{
  onClick?: () => void;
  onClickDelete?: () => void;
}>) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '8px',
      })}
      onClick={onClick}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          textStyle: 'body-16-m',
          color: 'text.dark.04',
          flex: 1,
          gap: '2px',
        })}
      >
        {children}
        <IconCircleXFilled
          className={css({
            color: 'text.light.04',
            flexShrink: 0,
          })}
          size={20}
          onClick={onClickDelete}
        />
      </div>
      <IconChevronRight
        className={css({
          color: 'text.light.04',
        })}
        size={20}
      />
    </div>
  );
}
