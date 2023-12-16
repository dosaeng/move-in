import { CheckBox, IconButton, IconChevronRight } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';

interface SignUpTermsListItemProps {
  id?: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onDetail?: () => void;
}

const SignUpTermsListItem: React.FC<SignUpTermsListItemProps> = ({ id, label, checked, onChange, onDetail }) => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      })}
    >
      <CheckBox id={id} label={label} checked={checked} onChange={onChange} />
      <IconButton className={
        css({
          color: 'text.dark.01',
        })
      } size="xs" shape="clear" theme="neutral" icon={<IconChevronRight size={16} />} onClick={onDetail} />
    </div>
  );
};

export default SignUpTermsListItem;
