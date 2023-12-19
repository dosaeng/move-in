import {
  ProductDepositFormat,
  ProductMonthlyRentFormat,
  DateFormat,
} from '@move-in/design-system';
import { IonSkeletonText } from '@ionic/react';
import { css } from '@move-in/styled-system/css';
import { ProductSuggestionListItemModel } from '../hooks/useProductSuggestionList';

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
        gap: '20px',
      })}
      onClick={onClick}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <div
            className={css({
              textStyle: 'body-16-m',
              color: 'text.dark.04',
              marginBottom: '4px',
            })}
          >
            <ProductDepositFormat value={data.deposit} />
            <span>{` ∙ `}</span>
            <ProductMonthlyRentFormat value={data.monthlyRent} />
          </div>
          <div
            className={css({
              textStyle: 'body-12-r',
              color: 'text.dark.01',
              marginBottom: '12px',
            })}
          >{`${data.address} ∙ ${data.name}`}</div>
          <div
            className={css({
              textStyle: 'body-12-r',
              color: 'text.dark.03',
            })}
          >
            <DateFormat date={data.minimumMoveInDate} format="MM월 dd일" />
            <span>{' 이후 입주 가능'}</span>
          </div>
        </div>
        <img
          className={css({
            borderRadius: '8px',
            height: '88px',
          })}
          src={data.thumbnail}
          alt={data.name}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            textStyle: 'body-12-r',
            color: 'text.dark.01',
          })}
        >
          <DateFormat date={data.suggestionDate} format="yyyy.MM.dd" />
        </div>
        <div
          className={css({
            textStyle: 'body-14-m',
            color: 'text.dark.04',
            display: 'flex',
            alignItems: 'end',
            gap: '2px',
          })}
        >
          <span>{`${data.agentName} 중개사`}</span>
          <span
            className={css({
              textStyle: 'body-12-r',
              color: 'text.dark.02',
            })}
          >{`(리뷰 ${data.agentRating.toFixed(1)}점)`}</span>
        </div>
      </div>
    </div>
  );
};

export const ProductSuggestionListItemSkeleton: React.FC = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <IonSkeletonText
            animated
            style={{
              width: '200px',
              height: '16px',
              marginBottom: '4px',
              borderRadius: '4px',
            }}
          />
          <IonSkeletonText
            animated
            style={{
              width: '80%',
              height: '12px',
              marginBottom: '12px',
              borderRadius: '4px',
            }}
          />
        </div>
        <IonSkeletonText
          style={{ width: '88px', height: '88px', borderRadius: '8px' }}
        />
      </div>
      <div style={{ height: '20px' }} />
    </div>
  );
};

export default ProductSuggestionListItem;
