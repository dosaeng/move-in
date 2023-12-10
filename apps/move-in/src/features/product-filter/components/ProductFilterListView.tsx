import useProductFilterList, { ProductFilterListItemModel, ProductFilterState } from '../hooks/useProductFilterList';
import { cx, css } from '@move-in/styled-system/css';
import ProductFilterListItem, { ProductFilterListItemSkeleton } from './ProductFilterListItem';

interface Props {
  className?: string;
  state?: ProductFilterState[];
  sort?: string;
  onClick?: (data: ProductFilterListItemModel) => void;
}

const ProductFilterListView: React.FC<Props> = ({ className, state, onClick }) => {
  const { data, isLoading } = useProductFilterList();
  const filteredData = data?.filter((item) => {
    if (!state) return true;

    return state.includes(item.state);
  });

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
          {filteredData?.map((item) => (
            <ProductFilterListItem key={item.id} data={item} onClick={() => onClick && onClick(item)} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductFilterListView;
