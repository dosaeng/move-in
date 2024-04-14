import { IonToolbar } from '@ionic/react';
import { css, cva, sva } from '@move-in/styled-system/css';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import React from 'react';

const headerStyle = sva({
  slots: ['root', 'titleContainer', 'title', 'icon'],
  base: {
    root: {
      display: 'flex',
      width: '100%',
      height: '48px',
      paddingX: '16px',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'text.dark.04',
      gap: '28px',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textStyle: 'body-16-m',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      overflow: 'hidden',
    },
    title: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    icon: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: '24px',
    },
  },
  variants: {
    theme: {
      default: {
        root: {
          backgroundColor: 'fill.light.01',
        },
      },
      clearWhite: {
        root: {
          backgroundColor: 'transparent',
          color: 'text.light.01',
        },
      },
      clearBlack: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

interface PagerHeaderProps {
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  theme?: 'default' | 'clearWhite' | 'clearBlack';
}

export const PageHeader: React.FC<PagerHeaderProps> = ({
  left,
  title,
  right,
  theme,
}) => {
  const classes = headerStyle({ theme });

  return (
    <IonToolbar
      className={css({
        '--min-height': '48px',
      })}
    >
      <div className={classes.root}>
        <div className={classes.icon}>{left}</div>
        <div className={classes.titleContainer}>
          <span className={classes.title}>{title}</span>
        </div>
        <div className={classes.icon}>{right}</div>
      </div>
    </IonToolbar>
  );
};

const iconStyle = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    minWidth: '24px',
    borderRadius: '8px',
    cursor: 'pointer',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    _hover: {
      opacity: 0.8,
      _disabled: {
        opacity: 0.5,
      },
    },
  },
});

export const PageHeaderBackButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <button className={iconStyle()} onClick={onClick}>
      {<IconArrowLeft size={24} />}
    </button>
  );
};

export const PageHeaderCloseButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <button className={iconStyle()} onClick={onClick}>
      {<IconX size={24} />}
    </button>
  );
};
