import { css, cx } from '@move-in/styled-system/css';
import useProductList, { ProductListItemModel } from '../hooks/useProductList';
import ProductListItem, { ProductListItemSkeleton } from './ProductListItem';
import EmptyView from '@/common/components/EmptyView';

interface Props {
  className?: string;
  sort?: string;
  onClick?: (data: ProductListItemModel) => void;
}

const ProductListView: React.FC<Props> = ({ className, onClick }) => {
  const { data, isLoading, isError } = useProductList();
  const isEmpty = isError || data?.length === 0;

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        })
      )}
    >
      {isLoading ? (
        <>
          <ProductListItemSkeleton />
          <ProductListItemSkeleton />
        </>
      ) : isEmpty ? (
        <EmptyView>내 상품이 없습니다.</EmptyView>
      ) : (
        <>
          {data?.map((item) => (
            <ProductListItem
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

export default ProductListView;
