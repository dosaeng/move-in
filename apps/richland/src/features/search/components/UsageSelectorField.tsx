import { ProductUsage } from '@/features/product/product';
import { IconChevronRight } from '@move-in/design-system';
import { cx, css } from '@move-in/styled-system/css';
import ChipList from './ChipList';

interface Props {
  className?: string;
  selectedItems?: ProductUsage[];
  onClickHeader?: () => void;
  onClickDelete?: (item: ProductUsage) => void;
}

const UsageSelectorField: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  selectedItems = [],
  onClickHeader,
  onClickDelete,
}) => {
  const hasSelectedItems = selectedItems.length > 0;
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
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
        })}
        onClick={onClickHeader}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            gap: '6px',
          })}
        >
          <span
            className={css({
              textStyle: 'body-18-m',
              color: 'text.dark.04',
            })}
          >
            용도
          </span>
          <span
            className={css({
              textStyle: 'body-14-r',
              color: 'text.dark.01',
            })}
          >
            중복선택 가능
          </span>
        </div>
        <IconChevronRight
          className={css({
            color: 'text.light.04',
          })}
          size={20}
        />
      </div>
      {hasSelectedItems && (
        <ChipList
          items={selectedItems}
          labelGetter={(item) => item.name}
          onClickDelete={(item) => {
            onClickDelete?.(item);
          }}
        />
      )}
    </div>
  );
};

export default UsageSelectorField;
