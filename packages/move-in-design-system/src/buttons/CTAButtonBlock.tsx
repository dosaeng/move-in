import React, { PropsWithChildren } from 'react';
import { sva } from '@move-in/styled-system/css';

const blockStyle = sva({
  slots: ['root', 'floatingContainer', 'buttonContainer'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    floatingContainer: {
      display: 'none',
      height: '32px',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '16px 20px 24px 20px',
      gap: '12px',
      backgroundColor: 'fill.light.01'
    },
  },
  variants: {
    floating: {
      true: {
        floatingContainer: {
          display: 'block',
        },
      },
    },
  },
});

interface CTAButtonBlockProps {
  floating?: boolean;
}

export const CTAButtonBlock: React.FC<PropsWithChildren<CTAButtonBlockProps>> = ({ floating, children }) => {
  const classes = blockStyle({ floating });

  return (
    <div className={classes.root}>
      <div className={classes.floatingContainer} />
      <div className={classes.buttonContainer}>{children}</div>
    </div>
  );
};
