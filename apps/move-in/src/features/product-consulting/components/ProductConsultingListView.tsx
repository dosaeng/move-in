import { css, cx } from '@move-in/styled-system/css';
import useProductConsultingList, { ProductConsultingListItemModel, ProductConsultingState } from '../hooks/useProductConsultingList';
import ProductConsultingListItem, { ProductConsultingListItemSkeleton } from './ProductConsultingListItem';

interface Props {
  className?: string;
  state?: ProductConsultingState[];
  sort?: string;
  onClick?: (data: ProductConsultingListItemModel) => void;
}

const ProductConsultingListView: React.FC<Props> = ({ className, state, onClick }) => {
  const { data, isLoading } = useProductConsultingList();
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
          <ProductConsultingListItemSkeleton />
          <ProductConsultingListItemSkeleton />
        </>
      ) : (
        <>
          {filteredData?.map((item) => (
            <ProductConsultingListItem key={item.id} data={item} onClick={() => onClick && onClick(item)} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductConsultingListView;
