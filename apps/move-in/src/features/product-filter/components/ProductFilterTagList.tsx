import { cx, css } from '@move-in/styled-system/css';
import ProductFilterTagListItem from './ProductFilterTagListItem';

const ProductFilterTagList: React.FC<{ className?: string; tags: string[] }> = ({ className, tags }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          rowGap: '6px',
          columnGap: '4px',
        }),
        className
      )}
    >
      {tags.map((tag) => (
        <ProductFilterTagListItem>{tag}</ProductFilterTagListItem>
      ))}
    </div>
  );
};

export default ProductFilterTagList;
