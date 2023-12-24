import { css, cx } from '@move-in/styled-system/css';
import useProductFilterList, {
  ProductFilterListItemModel,
} from '../hooks/useProductFilterList';
import ProductFilterListItem, {
  ProductFilterListItemSkeleton,
} from './ProductFilterListItem';
import EmptyView from '@/common/components/EmptyView';

interface Props {
  className?: string;
  sort?: string;
  onClick?: (data: ProductFilterListItemModel) => void;
}

const ProductFilterListView: React.FC<Props> = ({ className, onClick }) => {
  const { data, isLoading, isError } = useProductFilterList();
  const isEmpty = isError || data?.length === 0;

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingX: '16px',
        })
      )}
    >
      {isLoading ? (
        <>
          <ProductFilterListItemSkeleton />
          <ProductFilterListItemSkeleton />
        </>
      ) : isEmpty ? (
        <EmptyView>고객이 생성한 필터가 없습니다.</EmptyView>
      ) : (
        <>
          {data?.map((item) => (
            <ProductFilterListItem
              key={item.id}
              data={item}
              onClick={() => onClick && onClick(item)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductFilterListView;
