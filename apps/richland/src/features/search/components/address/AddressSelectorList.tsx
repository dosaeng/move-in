import EmptyView from '@/common/components/EmptyView';
import InfiniteScrollDetector from '@/common/components/InfiniteScrollDetector';
import LoadingView from '@/common/components/LoadingView';
import useProductAddressList from '@/features/product/hooks/useProductAddressList';
import { ProductAddress } from '@/features/product/product';
import { css, cx } from '@move-in/styled-system/css';
import SelectorListUnit from '../SelectorListUnit';

interface Props {
  className?: string;
  selectedItems?: ProductAddress[];
  onClickItem?: (item: ProductAddress) => void;
  parentId: string;
  filterKeyword?: string;
}

const AddressSelectorList: React.FC<Props> = ({
  className,
  parentId,
  filterKeyword,
  selectedItems,
  onClickItem,
}) => {
  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useProductAddressList({
      id: parentId,
      name: filterKeyword,
      level: 2,
    });
  const isEmpty = data?.pages?.length === 0 || data?.pages[0].totalCount === 0;
  let child;

  if (isLoading) {
    child = <LoadingView />;
  } else if (isEmpty) {
    child = <EmptyView>주소 데이터가 없습니다.</EmptyView>;
  } else {
    child = (
      <>
        {data?.pages?.flatMap(({ list: items }) => {
          return items.map((item) => {
            const isChecked = selectedItems?.some(
              (selectedItem) => selectedItem.id === item.id
            );
            const isDisabled = item.count == null || item.count === 0;

            return (
              <SelectorListUnit
                key={item.id}
                title={
                  item.level === 2
                    ? item.levelTwoName
                    : `${item.levelTwoName} ${item.levelThreeName}`
                }
                suffix={item.count}
                onClick={() => onClickItem?.(item)}
                isChecked={isChecked}
                isDisabled={isDisabled}
              />
            );
          });
        })}
        <InfiniteScrollDetector
          loadMore={fetchNextPage}
          hasMore={hasNextPage}
          loading={isFetchingNextPage}
        />
      </>
    );
  }

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
      {child}
    </div>
  );
};

export default AddressSelectorList;
