import { IconArrowRight } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  onClick?: () => void;
}

const TermsListItem: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textStyle: 'paragraph-16-r',
          color: 'text.dark.03',
          paddingY: '4px',
          cursor: 'pointer',
        })
      )}
      onClick={onClick}
    >
      {children}
      <IconArrowRight size={20} />
    </div>
  );
};

export default TermsListItem;
