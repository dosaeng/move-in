import { cx, css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  title: string;
  caption?: string;
  leftIcon?: React.ReactNode;
  onClick?: () => void;
}

const FormFieldLabel: React.FC<Props> = ({
  className,
  title,
  caption,
  leftIcon,
  onClick,
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
      })}
      onClick={onClick}
    >
      <div
        className={cx(
          css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            gap: '6px',
          }),
          className
        )}
      >
        <span
          className={css({
            textStyle: 'body-18-m',
            color: 'text.dark.04',
          })}
        >
          {title}
        </span>
        {caption && (
          <span
            className={css({
              textStyle: 'body-14-r',
              color: 'text.dark.01',
            })}
          >
            {caption}
          </span>
        )}
      </div>
      {leftIcon}
    </div>
  );
};

export default FormFieldLabel;
