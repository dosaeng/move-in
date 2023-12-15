import { css, cx } from '@move-in/styled-system/css';
import useProductFilterList, { ProductFilterListItemModel } from '../hooks/useProductFilterList';
import ProductFilterListItem, { ProductFilterListItemSkeleton } from './ProductFilterListItem';

interface Props {
  className?: string;
  sort?: string;
  onClick?: (data: ProductFilterListItemModel) => void;
}

const ProductFilterListView: React.FC<Props> = ({ className, onClick }) => {
  const { data, isLoading } = useProductFilterList();

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
      ) : (
        <>
          {data?.map((item) => (
            <ProductFilterListItem key={item.id} data={item} onClick={() => onClick && onClick(item)} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductFilterListView;
