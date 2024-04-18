import useProductUsageList from '@/features/product/hooks/useProductUsageList';
import { ProductUsage } from '@/features/product/product';
import { css, cx } from '@move-in/styled-system/css';
import SelectorListUnit from './SelectorListUnit';

interface Props {
  className?: string;
  filterKeyword?: string;
  selectedItems?: ProductUsage[];
  onClickItem?: (item: ProductUsage) => void;
}

const UsageSelectorList: React.FC<Props> = ({
  className,
  filterKeyword,
  selectedItems,
  onClickItem,
}) => {
  const { data, isLoading } = useProductUsageList({
    filter: filterKeyword,
  });

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
        })
      )}
    >
      {isLoading && <div>Loading...</div>}
      {data?.map((item) => {
        const isChecked = selectedItems?.some(
          (selectedItem) => selectedItem.id === item.id
        );
        const isDisabled = item.count == null || item.count === 0;

        return (
          <SelectorListUnit
            key={item.id}
            title={item.name}
            suffix={item.count}
            onClick={() => onClickItem?.(item)}
            isChecked={isChecked}
            isDisabled={isDisabled}
          />
        );
      })}
    </div>
  );
};

export default UsageSelectorList;
