import { css, cx } from '@move-in/styled-system/css';
import useProductList, { ProductListItemModel } from '../hooks/useProductList';
import ProductListItem, { ProductListItemSkeleton } from './ProductListItem';

interface Props {
  className?: string;
  sort?: string;
  onClick?: (data: ProductListItemModel) => void;
}

const ProductListView: React.FC<Props> = ({ className, onClick }) => {
  const { data, isLoading } = useProductList();

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
      ) : (
        <>
          {data?.map((item) => (
            <ProductListItem key={item.id} data={item} onClick={() => onClick && onClick(item)} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductListView;
