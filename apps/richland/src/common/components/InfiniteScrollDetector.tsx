import { IonSpinner } from '@ionic/react';
import { css, cva } from '@move-in/styled-system/css';
import { useEffect, useRef } from 'react';

function InfiniteScrollDetector({
  loadMore,
  hasMore = false,
  loading = false,
}: {
  loadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!hasMore) return;
      if (loading) return;

      if (!entries[0].isIntersecting) return;

      loadMore?.();
    });
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, hasMore, loading, loadMore]);

  return (
    <div
      ref={ref}
      className={css({
        display: 'flex',
        justifyContent: 'center',
        padding: 16,
      })}
    >
      <IonSpinner
        className={cva({
          base: {
            visibility: 'visible',
          },
          variants: {
            hasMore: {
              false: {
                visibility: 'hidden',
              },
            },
          },
        })({ hasMore })}
        name="bubbles"
        color="medium"
      />
    </div>
  );
}

export default InfiniteScrollDetector;
