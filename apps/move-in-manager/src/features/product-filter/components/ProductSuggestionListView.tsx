import { LineDivider } from '@move-in/move-in-design-system';
import useProductSuggestionList, { ProductSuggestionListItemModel } from '../hooks/useProductSuggestionList';
import ProductSuggestionListItem from './ProductSuggestionListItem';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  filterId: string | number;
  onClick?: (data: ProductSuggestionListItemModel) => void;
}

const ProductSuggestionListView: React.FC<Props> = ({ className, filterId, onClick }: Props) => {
  const { data, isLoading } = useProductSuggestionList(filterId);

  if (isLoading) return <></>;

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingX: '16px',
          paddingTop: '16px',
          paddingBottom: '24px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'stroke.light.02',
          borderRadius: '16px',
        }),
        className
      )}
    >
      <div
        className={css({
          textStyle: 'body-14-r',
          color: 'text.dark.01',
        })}
      >
        내가 보낸 제안
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {data?.reduce((result, item) => {
          if (result.length !== 0) {
            result.push(
              <LineDivider
                className={css({
                  marginY: '16px',
                })}
                key={`${item.id}-divider`}
                dashed
              />
            );
          }

          result.push(<ProductSuggestionListItem key={item.id} data={item} onClick={() => onClick && onClick(item)} />);

          return result;
        }, [] as React.ReactNode[])}
      </div>
    </div>
  );
};

export default ProductSuggestionListView;
