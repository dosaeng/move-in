import { FormInputLabel } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  prefix: string;
  label: string;
}

const FormInputContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, className, prefix, label }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }),
        className
      )}
    >
      <FormInputLabel prefix={prefix} label={label} />
      {children}
    </div>
  );
};

export default FormInputContainer;
