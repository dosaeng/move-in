import { css, cx } from '@move-in/styled-system/css';
import useProductFilterList, { ProductFilterListItemModel, ProductFilterState } from '../hooks/useProductFilterList';
import ProductFilterListItem, { ProductFilterListItemSkeleton } from './ProductFilterListItem';

interface Props {
  className?: string;
  state?: ProductFilterState[];
  sort?: string;
  onClick?: (data: ProductFilterListItemModel) => void;
}

const ProductFilterListView: React.FC<Props> = ({ className, state, onClick }) => {
  const { data, isLoading } = useProductFilterList({ state });

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
