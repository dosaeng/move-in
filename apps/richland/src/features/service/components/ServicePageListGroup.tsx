import { cx, css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  title: string;
}

const ServicePageListGroup: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  title,
  children,
}) => {
  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        })
      )}
    >
      <div
        className={css({
          textStyle: 'body-14-sb',
          color: 'text.dark.04',
        })}
      >
        {title}
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ServicePageListGroup;
