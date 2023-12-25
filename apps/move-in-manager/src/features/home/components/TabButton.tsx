import { useHistory, useLocation } from 'react-router-dom';
import { cx, css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  href: string;
  disabled?: boolean;
}

const TabButton: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  href,
  disabled = false,
  children,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <button
      className={cx(
        css({
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'fill.light.01',
          color: 'text.dark.02',
          textStyle: 'body-14-sb',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'stroke.light.02',
          cursor: 'pointer',
          '&.tab-selected': {
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'stroke.dark.01',
            color: 'text.dark.04',
          },
          _disabled: {
            cursor: 'none',
          },
        }),
        className,
        location.pathname === href ? 'tab-selected' : undefined
      )}
      onClick={() => {
        history.push(href);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TabButton;
