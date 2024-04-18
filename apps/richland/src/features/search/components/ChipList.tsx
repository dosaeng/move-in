import { cx, css } from '@move-in/styled-system/css';
import Chip from './Chip';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props<T> {
  className?: string;
  labelGetter?: (item: T) => React.ReactNode;
  items: T[];
  onClickDelete?: (item: T) => void;
}

const MAX_VISIBLE_LENGTH = 10;
const MAX_HEIGHT = 70;

function ChipList<T>({
  className,
  labelGetter,
  items,
  onClickDelete,
}: Props<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleLength, setVisibleLength] = useState(MAX_VISIBLE_LENGTH);
  const visibleItems = items.slice(0, visibleLength);
  const isMore = items.length > visibleLength;
  const moreLength = isMore ? items.length - visibleLength : 0;

  useLayoutEffect(() => {
    if (ref.current) {
      if (ref.current.clientHeight > MAX_HEIGHT) {
        setVisibleLength(visibleLength - 1);
      }
    }
  }, [ref, visibleLength, items.length]);

  useEffect(() => {
    setVisibleLength(MAX_VISIBLE_LENGTH);
  }, [items.length]);

  return (
    <div
      ref={ref}
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        })
      )}
    >
      {visibleItems.map((item, index) => {
        return (
          <Chip
            key={index}
            label={labelGetter?.(item) ?? `${item}`}
            onClickDelete={() => {
              onClickDelete?.(item);
            }}
          />
        );
      })}
      {isMore && (
        <span
          className={css({
            textStyle: 'body-14-r',
            color: 'text.dark.03',
          })}
        >{`외 ${moreLength}건`}</span>
      )}
    </div>
  );
}

export default ChipList;
