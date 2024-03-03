import {
  IconSelector,
  OutlinedBox,
  OutlinedFieldContainer
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  telecom?: string;
  phoneNumber?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const PhoneNumberField: React.FC<Props> = ({
  className,
  telecom,
  phoneNumber,
  disabled,
  onClick,
}) => {
  return (
    <OutlinedFieldContainer className={className} label="휴대폰 번호">
      <div
        className={css({
          display: 'flex',
          gap: '8px',
        })}
      >
        <OutlinedBox
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            width: '120px',
          })}
          disabled={disabled}
          onClick={onClick}
        >
          <span
            className={css({
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            })}
          >
            {telecom}
          </span>
          <IconSelector />
        </OutlinedBox>
        <OutlinedBox
          className={css({
            flex: 1,
          })}
          disabled={disabled}
          onClick={onClick}
        >
          {phoneNumber}
        </OutlinedBox>
      </div>
    </OutlinedFieldContainer>
  );
};

export default PhoneNumberField;
