import { css, cx } from '@move-in/styled-system/css';
import React from 'react';

interface Props {
  className?: string;
  step: number;
  maxStep: number;
}

export const StepIndicator: React.FC<Props> = ({ className, step, maxStep }) => {
  return (
    <div
      className={cx(
        css({
          textStyle: 'body-14-r',
          color: 'text.light.04',
          display: 'flex',
        }),
        className
      )}
    >
      <span
        className={css({
          textStyle: 'body-14-sb',
          color: 'brand.purple.03',
          paddingRight: '4px',
        })}
      >
        Step {step.toString().padStart(2, '0')}
      </span>
      {`/ ${maxStep.toString().padStart(2, '0')}`}
    </div>
  );
};
