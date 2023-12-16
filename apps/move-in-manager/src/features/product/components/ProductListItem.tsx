import { IonSkeletonText } from '@ionic/react';
import { DateFormat, ProductDepositFormat, ProductMonthlyRentFormat } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import React from 'react';
import { ProductListItemModel } from '../hooks/useProductList';

interface Props {
  data: ProductListItemModel;
  onClick?: () => void;
}

const ProductListItem: React.FC<Props> = ({ data, onClick }) => {
  return (
    <div
      className={css({
        display: 'flex',
        gap: '20px',
        cursor: 'pointer',
      })}
      onClick={onClick}
    >
      <div
        className={css({
          flex: 1,
        })}
      >
        <div
          className={css({
            display: 'flex',
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
        >
          <span>{`${data.address}∙${data.name}`}</span>
          <span>{`(${data.supplyArea}m²/${data.dedicatedArea}m² ∙ 방${data.roomCount} 화${data.bathroomCount}) `}</span>
          <span>{`${data.floor}층`}</span>
        </div>
        <div
          className={css({
            textStyle: 'body-12-r',
            color: 'text.dark.03',
          })}
        >
          <DateFormat date={data.minimumMoveInDate} format="MM월 dd일" />
          {' 이후 입주 가능'}
        </div>
      </div>
      <img
        className={css({
          objectFit: 'cover',
          flex: '0 0 100px',
          height: '88px',
          borderRadius: '8px',
        })}
        src={data.thumbnail}
        alt={`${data.name} 이미지`}
      />
    </div>
  );
};

export default ProductListItem;

export const ProductListItemSkeleton: React.FC = () => {
  return (
    <div
      className={css({
        height: '90px',
        display: 'flex',
        gap: '20px',
      })}
    >
      <div
        className={css({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <IonSkeletonText animated style={{ width: '130px', height: '22px', borderRadius: '4px' }} />
        <IonSkeletonText animated style={{ width: '200px', height: '34px', borderRadius: '4px' }} />
      </div>
      <IonSkeletonText style={{ width: '100px', height: '100%', borderRadius: '8px', flex: '0 0 100px' }} />
    </div>
  );
};
