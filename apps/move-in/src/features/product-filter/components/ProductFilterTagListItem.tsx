import { css } from '@move-in/styled-system/css';

const ProductFilterTagListItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={css({
        borderRadius: '10px',
        border: '1px solid #EBEBEB',
        backgroundColor: '#FFFFFF',
        textStyle: 'body-12-m',
        color: 'text.dark.02',
        paddingX: '14px',
        paddingY: '8px',
        whiteSpace: 'nowrap',
      })}
    >
      {children}
    </div>
  );
};

export default ProductFilterTagListItem;
