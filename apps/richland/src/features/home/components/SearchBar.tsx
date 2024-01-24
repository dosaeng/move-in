import { IconSearch } from '@move-in/design-system';
import { cx, css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  onClick?: () => void;
}

const SearchBar: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div
      className={cx(
        css({
          borderRadius: '12px',
          border: '1.4px solid #874AC5',
          backgroundColor: '#FFF',
          padding: '14px 16px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }),
        className
      )}
      onClick={onClick}
    >
      <div
        className={css({
          textStyle: 'body-14-r',
          color: '#CACACA',
        })}
      >
        경매 물건 통합 검색
      </div>
      <IconSearch
        className={css({
          color: 'text.light.04',
        })}
        width={20}
        height={20}
      />
    </div>
  );
};

export default SearchBar;
