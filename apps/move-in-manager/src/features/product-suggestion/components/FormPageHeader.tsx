import { StepIndicator } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  title: React.ReactNode;
  step: number;
}

const FormPageHeader: React.FC<Props> = ({ className, title, step }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }),
        className
      )}
    >
      <StepIndicator step={step} maxStep={5} />
      <h2
        className={css({
          textStyle: 'header-24-sb',
          color: 'text.dark.04',
        })}
      >
        {title}
      </h2>
    </div>
  );
};

export default FormPageHeader;
