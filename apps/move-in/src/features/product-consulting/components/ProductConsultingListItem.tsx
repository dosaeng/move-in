import { IonSkeletonText } from '@ionic/react';
import { ProductConsultingListItemModel } from '../hooks/useProductConsultingList';
import { css } from '@move-in/styled-system/css';
import { ProductDepositFormat, ProductMonthlyRentFormat, DateFormat } from '@move-in/design-system';

interface Props {
  data: ProductConsultingListItemModel;
  onClick?: () => void;
}

const ProductConsultingListItem: React.FC<Props> = ({ data, onClick }) => {
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
          <div className={css({ textStyle: 'body-16-m', color: 'text.dark.04', marginBottom: '4px' })}>
            <ProductDepositFormat value={data.deposit} />
            <span>{` ∙ `}</span>
            <ProductMonthlyRentFormat value={data.monthlyRent} />
          </div>
          <div
            className={css({ textStyle: 'body-12-r', color: 'text.dark.01', marginBottom: '12px' })}
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
          <DateFormat date={data.consultingRequestDate} format="yyyy.MM.dd" />
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

export default ProductConsultingListItem;

export const ProductConsultingListItemSkeleton: React.FC = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '130px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <IonSkeletonText
          className={css({
            width: '100px',
            borderRadius: '8px',
          })}
          animated
        />
        <IonSkeletonText
          className={css({
            width: '200px',
            height: '43px',
            borderRadius: '8px',
          })}
          animated
        />
      </div>
      <IonSkeletonText
        className={css({
          width: '100px',
          height: '88px',
          borderRadius: '8px',
        })}
      />
    </div>
  );
};
