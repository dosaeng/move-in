import { OutlinedBox, OutlinedFieldContainer } from '@move-in/design-system';

interface Props {
  className?: string;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const NameField: React.FC<Props> = ({
  className,
  onClick,
  value,
  disabled,
}) => {
  return (
    <OutlinedFieldContainer className={className} label="이름">
      <OutlinedBox disabled={disabled} onClick={onClick}>
        {value}
      </OutlinedBox>
    </OutlinedFieldContainer>
  );
};

export default NameField;
