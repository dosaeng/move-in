import { OutlinedBox, OutlinedFieldContainer } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const BirthdayGenderField: React.FC<Props> = ({
  className,
  value,
  disabled,
  onClick,
}) => {
  return (
    <OutlinedFieldContainer label="생년월일 및 성별" className={className}>
      <OutlinedBox
        className={cx(
          className,
          css({
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          })
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {value}
      </OutlinedBox>
    </OutlinedFieldContainer>
  );
};

export default BirthdayGenderField;
