import { ProductUsage } from '@/features/product/product';
import { IconChevronRight } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';
import ChipList from '../ChipList';
import FormFieldLabel from '../FormFieldLabel';

interface Props {
  className?: string;
  selectedItems?: ProductUsage[];
  onClickHeader?: () => void;
  onClickDelete?: (item: ProductUsage) => void;
}

const UsageSelectorField: React.FC<Props> = ({
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
      <FormFieldLabel
        title="용도"
        caption="중복선택 가능"
        leftIcon={
          <IconChevronRight
            className={css({
              color: 'text.light.04',
            })}
            size={20}
          />
        }
        onClick={onClickHeader}
      />
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
