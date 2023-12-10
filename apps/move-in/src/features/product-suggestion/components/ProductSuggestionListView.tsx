import useProductSuggestionList, { ProductSuggestionListItemModel } from '../hooks/useProductSuggestionList';
import ProductSuggestionListItem, { ProductSuggestionListItemSkeleton } from './ProductSuggestionListItem';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  filterId: string | number;
  onClick?: (item: ProductSuggestionListItemModel) => void;
}

const ProductSuggestionListView: React.FC<Props> = ({ className, filterId, onClick }) => {
  const { data, isLoading } = useProductSuggestionList(filterId);

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }),
        className
      )}
    >
      {isLoading ? (
        <>
          <ProductSuggestionListItemSkeleton />
          <ProductSuggestionListItemSkeleton />
        </>
      ) : (
        <>
          {data!.map((item) => {
            return <ProductSuggestionListItem key={item.id} data={item} onClick={() => onClick && onClick(item)} />;
          })}
        </>
      )}
    </div>
  );
};

export default ProductSuggestionListView;
