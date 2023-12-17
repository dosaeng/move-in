import { ChipButtonList, RatingInput } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import React from 'react';

export interface ProductSuggestionRatingModel {
  score: number;
  selected: { key: number; value: string }[];
  comment: string;
}

interface Props {
  title: string;
  additionalContent?: React.ReactNode;
  data?: ProductSuggestionRatingModel;
  hideComment?: boolean;
}

export const ProductSuggestionRatingView = ({ title, additionalContent, data, hideComment }: Props) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          paddingX: '20px',
          gap: '20px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <div
            className={css({
              textStyle: 'body-14-sb',
            })}
          >
            {title}
          </div>
          <RatingInput value={data?.score} readOnly />
        </div>
        <ChipButtonList options={data?.selected} readOnly />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'stroke.light.02',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'stroke.light.02',
          backgroundColor: 'fill.light.02',
          padding: '20px',
        })}
      >
        {additionalContent}
        {!hideComment && (
          <div
            className={css({
              textStyle: 'body-14-r',
              color: 'text.dark.02',
              padding: '16px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'stroke.light.02',
              backgroundColor: 'fill.light.01',
              borderRadius: '16px',
            })}
          >
            {data?.comment}
          </div>
        )}
      </div>
    </div>
  );
};
