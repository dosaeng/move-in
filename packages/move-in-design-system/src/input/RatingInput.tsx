import { css, cx } from '@move-in/styled-system/css';
import React, { forwardRef } from 'react';
import { IconStar, IconStarFilled } from '..';

export interface RatingInputProps {
  className?: string;
  value?: number;
  defaultValue?: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: number;
  onChange?: (value: number) => void;
}

export const RatingInput: React.FC<RatingInputProps> = forwardRef<HTMLDivElement, RatingInputProps>(
  ({ className, value, defaultValue, size = 32, readOnly, disabled, onChange }, ref) => {
    const [isHover, setIsHover] = React.useState<boolean>(false);
    const [internalHoverValue, setInternalHoverValue] = React.useState<number>(defaultValue ?? value ?? 0);
    const [internalValue, setInternalValue] = React.useState<number>(defaultValue ?? 0);
    const currentValue = isHover ? internalHoverValue : value != null ? value : internalValue;
    const isBlockAction = readOnly || disabled;

    return (
      <div
        ref={ref}
        className={cx(
          css({
            display: 'flex',
            gap: '4px',
          }),
          className
        )}
        onMouseEnter={!isBlockAction ? () => setIsHover(true) : undefined}
        onMouseLeave={!isBlockAction ? () => setIsHover(false) : undefined}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const score = index + 1;
          const isFilled = currentValue >= score;

          return (
            <div
              key={index}
              onMouseOver={!isBlockAction ? () => setInternalHoverValue(score) : undefined}
              onClick={
                !isBlockAction
                  ? () => {
                      setInternalValue(score);
                      onChange && onChange(score);
                    }
                  : undefined
              }
            >
              {isFilled ? (
                <IconStarFilled
                  className={
                    disabled
                      ? css({
                          color: 'brand.purple.01',
                        })
                      : css({
                          color: 'brand.purple.03',
                        })
                  }
                  size={size}
                />
              ) : (
                <IconStar
                  className={css({
                    color: 'stroke.light.01',
                  })}
                  size={size}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);
