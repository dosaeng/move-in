import {
  ProductDepositFormat,
  ProductMonthlyRentFormat,
  DateFormat,
  IconChevronRight,
} from '@move-in/design-system';
import { ProductSuggestionListItemModel } from '../hooks/useProductSuggestionList';
import { css } from '@move-in/styled-system/css';

interface Props {
  data: ProductSuggestionListItemModel;
  onClick?: () => void;
}

const ProductSuggestionListItem: React.FC<Props> = ({ data, onClick }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'pointer',
      })}
      onClick={onClick}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            textStyle: 'body-16-m',
            color: 'text.dark.04',
          })}
        >
          <ProductDepositFormat value={data.deposit} />
          <span>{` ∙ `}</span>
          <ProductMonthlyRentFormat value={data.monthlyRent} />
        </div>
        <IconChevronRight
          className={css({
            color: 'text.dark.04',
          })}
          size={16}
        />
      </div>
      <div
        className={css({
          textStyle: 'body-12-r',
          color: 'text.dark.01',
        })}
      >
        <span>{`${data.address}∙${data.name}`}</span>
        <br />
        <span>{`(${data.supplyArea}m²/${data.dedicatedArea}m² ∙ 방${data.roomCount} 화${data.bathroomCount}) `}</span>
        <span>{`${data.floor}층 ∙ `}</span>
        <span>
          <DateFormat date={data.minimumMoveInDate} format="MM월 dd일" />
          {' 이후 입주 가능'}
        </span>
      </div>
    </div>
  );
};

export default ProductSuggestionListItem;
