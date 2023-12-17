import { css } from '@move-in/styled-system/css';
import React from 'react';
import { DateFormat } from '../format/DateFormat';

export const ProductMoveInView: React.FC<{ minimumMoveInDate?: Date }> = ({ minimumMoveInDate }) => {
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
        <DateFormat date={minimumMoveInDate} format="yy년 M월 d일" />
        부터 입주 가능
      </div>
    </div>
  );
};
