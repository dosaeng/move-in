import { css } from '@move-in/styled-system/css';
import React from 'react';
import { ProductDepositFormat } from '../format/CurrencyFormat';

export const ProductCostView: React.FC<{ deposit?: number; monthlyFixedCost?: number; isCostAdjustable?: boolean }> = ({
  deposit,
  monthlyFixedCost,
  isCostAdjustable,
}) => {
  return (
    <div
      className={css({
        padding: '20px',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'stroke.light.02',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'stroke.light.02',
        backgroundColor: 'fill.light.02',
        display: 'flex',
        justifyContent: 'center',
      })}
    >
      <div
        className={css({
          width: '100%',
          textStyle: 'body-16-m',
          color: 'text.dark.04',
          paddingX: '16px',
          paddingY: '20px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'stroke.light.02',
          backgroundColor: 'fill.light.01',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <ProductCostViewRow title="보증금">
          <ProductDepositFormat value={deposit ?? 0} />
        </ProductCostViewRow>
        <div
          className={css({
            marginX: '16px',
            borderLeftWidth: '1px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'stroke.light.02',
          })}
        />
        <ProductCostViewRow title="월고정비">
          <ProductDepositFormat value={monthlyFixedCost ?? 0} />
        </ProductCostViewRow>
        <div
          className={css({
            marginX: '16px',
            borderLeftWidth: '1px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'stroke.light.02',
          })}
        />
        <ProductCostViewRow title="비율 조정">{isCostAdjustable ? '가능' : '불가능'}</ProductCostViewRow>
      </div>
    </div>
  );
};

const ProductCostViewRow: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
      })}
    >
      <div
        className={css({
          textStyle: 'body-12-r',
          color: 'text.dark.01',
        })}
      >
        {title}
      </div>
      <div
        className={css({
          textStyle: 'body-16-m',
          color: 'text.dark.04',
        })}
      >
        {children}
      </div>
    </div>
  );
};
