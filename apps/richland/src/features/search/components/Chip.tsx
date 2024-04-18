import { IconCircleXFilled } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  label: React.ReactNode;
  onClickDelete?: () => void;
}

const Chip: React.FC<Props> = ({ className, label, onClickDelete }) => {
  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2px',
          bg: 'fill.light.02',
          color: 'text.dark.03',
          paddingX: '8px',
          paddingY: '4px',
          borderRadius: '12px',
          textStyle: 'body-14-r',
          cursor: 'pointer',
        })
      )}
      onClick={onClickDelete}
    >
      <span>{label}</span>
      <IconCircleXFilled
        className={css({
          color: 'text.light.04',
          flexShrink: 0,
        })}
        size={20}
      />
    </div>
  );
};

export default Chip;
