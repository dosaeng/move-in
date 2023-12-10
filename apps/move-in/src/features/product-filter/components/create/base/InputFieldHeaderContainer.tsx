import { css } from '@move-in/styled-system/css';

interface Props {
  title: string;
  subtitle?: string;
}

const InputFieldHeaderContainer: React.FC<React.PropsWithChildren<Props>> = ({ title, subtitle, children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
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
            textStyle: 'body-12-r',
            color: 'text.dark.01',
          })}
        >
          {subtitle}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default InputFieldHeaderContainer;
