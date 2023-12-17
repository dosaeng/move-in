import { cx, cva } from '@move-in/styled-system/css';

export const ChipButton: React.FC<
  React.PropsWithChildren<{
    className?: string;
    selected?: boolean;
    onClick?: () => void;
  }>
> = ({ className, selected, onClick, children }) => {
  return (
    <div
      className={cx(
        cva({
          base: {
            borderRadius: '10px',
            border: '1px solid #EBEBEB',
            backgroundColor: '#FFFFFF',
            textStyle: 'body-12-m',
            color: 'text.dark.02',
            paddingX: '14px',
            paddingY: '8px',
            whiteSpace: 'nowrap',
          },
          variants: {
            selected: {
              true: {
                border: '1px solid #874AC5',
                color: '#874AC5',
              },
            },
          },
        })({ selected }),
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
