import { BoxLabel, DateFormat } from '@move-in/move-in-design-system';
import { css, cx } from '@move-in/styled-system/css';
import { useMemo } from 'react';
import useProductSuggestionDetail, { ProductSuggestionDetailModel } from '../../hooks/useProductSuggestionDetail';

interface Props {
  className?: string;
  id: string | number;
}

const ProductDetailSection: React.FC<Props> = ({ className, id }) => {
  const { data } = useProductSuggestionDetail(id);

  return (
    <div className={cx(css({ display: 'flex', flexDirection: 'column' }), className)}>
      <ProductDetailHeader
        className={css({
          marginBottom: '24px',
          paddingX: '16px',
        })}
        data={data}
      />
      <ProductDetailImageGrid
        className={css({
          marginBottom: '32px',
        })}
        data={data}
      />
      <ProductDetailContent
        className={css({
          paddingX: '16px',
        })}
        data={data}
      />
    </div>
  );
};

export default ProductDetailSection;

const ProductDetailHeader: React.FC<{ className?: string; data?: ProductSuggestionDetailModel }> = ({
  className,
  data,
}) => {
  return (
    <div className={cx(css({ display: 'flex', flexDirection: 'column', gap: '8px' }), className)}>
      <div
        className={css({
          display: 'flex',
          marginBottom: '8px',
        })}
      >
        <BoxLabel>{data?.product.type}</BoxLabel>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <div
          className={css({
            textStyle: 'header-24-sb',
            color: 'text.dark.04',
          })}
        >
          {data?.product.name}
        </div>
        <div
          className={css({
            textStyle: 'body-14-r',
            color: 'text.dark.04',
          })}
        >
          {data?.product.address}
        </div>
      </div>
    </div>
  );
};

const ProductDetailImageGrid: React.FC<{ className?: string; data?: ProductSuggestionDetailModel }> = ({
  className,
  data,
}) => {
  const images = useMemo(() => {
    const images = [...(data?.product.images ?? [])];

    if (images.length < 5) {
      images.push(...Array(5 - images.length).fill('https://placehold.co/300x300?text=MoveIn'));
    }

    return images;
  }, [data]);

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          gap: '1px',
          bg: 'fill.light.02',
          height: '300px',
          overflowX: 'auto',
          '@media (max-width: 568px)': {
            height: 'calc(100vw / 2)',
          },
        }),
        className
      )}
    >
      <img
        className={css({
          objectFit: 'cover',
          flex: '0 1 300px',
          maxWidth: '300px',
          height: '100%',
          '@media (max-width: 568px)': {
            flex: '0 1 calc(100vw / 2)',
            maxWidth: 'calc(100vw / 2)',
          },
        })}
        key={images[0]}
        src={images[0]}
        alt={`이미지 1`}
      />
      <div
        className={css({
          display: 'flex',
          flexFlow: 'column wrap',
          gap: '1px',
          bg: 'fill.light.02',
          height: '100%',
          flex: '1',
        })}
      >
        {images.slice(1).map((image, index) => (
          <img
            className={css({
              objectFit: 'cover',
              flex: '0 1 calc(50% - 1px)',
              height: 'calc(50% - 1px)',
              minWidth: '150px',
              '@media (max-width: 568px)': {
                minWidth: 'calc(100vw / 4)',
              },
            })}
            key={image}
            src={image}
            alt={`이미지 ${index + 2}`}
          />
        ))}
      </div>
      <div className={css({ flex: 1 })}></div>
    </div>
  );
};

const ProductDetailContent: React.FC<{ className?: string; data?: ProductSuggestionDetailModel }> = ({
  className,
  data,
}) => {
  return (
    <div
      className={cx(
        css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', rowGap: '20px', columnGap: '12px' }),
        className
      )}
    >
      <ProductDetailContentRow title="전용 / 공급 면적">
        {data?.product.dedicatedArea}m² / {data?.product.supplyArea}m²
      </ProductDetailContentRow>
      <ProductDetailContentRow title="공간 구성">
        {data?.product.roomCount}개 / {data?.product.bathroomCount}개
      </ProductDetailContentRow>
      <ProductDetailContentRow title="층수 및 주실 방향">
        {data?.product.floor}층 / {data?.product.totalFloor}층 / {data?.product.direction}
      </ProductDetailContentRow>
      <ProductDetailContentRow title="사용 승인일">
        <DateFormat date={data?.product.approvalDate} format="yyyy.MM.dd" />
      </ProductDetailContentRow>
      <ProductDetailContentRow title="매물 등록일">
        <DateFormat date={data?.product.registeredDate} format="yyyy.MM.dd" />
      </ProductDetailContentRow>
      <ProductDetailContentRow title="담당 중개인">{data?.agent.name}</ProductDetailContentRow>
    </div>
  );
};

const ProductDetailContentRow: React.FC<React.PropsWithChildren<{ className?: string; title: string }>> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={cx(css({ display: 'flex', flexDirection: 'column', gap: '4px' }), className)}>
      <div
        className={css({
          textStyle: 'body-12-r',
          color: 'text.dark.02',
        })}
      >
        {title}
      </div>
      <div
        className={css({
          textStyle: 'body-14-m',
          color: 'text.dark.04',
        })}
      >
        {children}
      </div>
    </div>
  );
};
