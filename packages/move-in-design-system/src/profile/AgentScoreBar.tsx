import { cx, css } from '@move-in/styled-system/css';
import React from 'react';
import { IconStarFilled } from '../icons/icons';

interface AgentScoreBarProps {
  className?: string;
  reviewScore?: number;
  reviewCount?: number;
}

export const AgentScoreBar: React.FC<AgentScoreBarProps> = ({ className, reviewScore, reviewCount }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }),
        className
      )}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          textStyle: 'body-14-r',
          color: 'text.dark.04',
        })}
      >
        <IconStarFilled
          className={css({
            color: 'brand.purple.03',
          })}
          size={16}
        />
        <span>{reviewScore ?? 0}</span>
      </div>
      <span>·</span>
      <span
        className={css({
          textStyle: 'body-14-r',
          color: 'text.dark.01',
        })}
      >{`(리뷰 ${reviewCount ?? 0}개)`}</span>
    </div>
  );
};
