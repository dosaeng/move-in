import EmptyView from '@/common/component/EmptyView';
import useProductSuggestionList, {
  ProductSuggestionListItemModel,
} from '../hooks/useProductSuggestionList';
import ProductSuggestionListItem, {
  ProductSuggestionListItemSkeleton,
} from './ProductSuggestionListItem';
import { css, cx } from '@move-in/styled-system/css';
import useProductFilterDetail from '@/features/product-filter/hooks/useProductFilterDetail';
import { ProductFilterState } from '@/features/product-filter/hooks/useProductFilterList';

interface Props {
  className?: string;
  filterId: string | number;
  onClick?: (item: ProductSuggestionListItemModel) => void;
}

const ProductSuggestionListView: React.FC<Props> = ({
  className,
  filterId,
  onClick,
}) => {
  const { data: detail } = useProductFilterDetail(filterId);
  const { data, isLoading } = useProductSuggestionList(filterId);
  const isEmpty = !isLoading && !data?.length;

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
      ) : isEmpty ? (
        <EmptyView>
          <EmptyText state={detail?.state} />
        </EmptyView>
      ) : (
        <>
          {data!.map((item) => {
            return (
              <ProductSuggestionListItem
                key={item.id}
                data={item}
                onClick={() => onClick && onClick(item)}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProductSuggestionListView;

const EmptyText: React.FC<{ state?: ProductFilterState }> = ({ state }) => {
  switch (state) {
    case ProductFilterState.REQUESTED:
      return <>아직 제안이 도착하지 않았어요</>;
    case ProductFilterState.PUBLISHED:
    case ProductFilterState.DRAFT:
      return <>아직 요청을 하지 않았어요</>;
    case ProductFilterState.EXPIRED:
      return <>제안이 없습니다.</>;
  }
};
