import BoxLabel from '@/common/components/BoxLabel';
import useProductSuggestionDetail from '../../hooks/useProductSuggestionDetail';
import { cx, css } from '@move-in/styled-system/css';
import { IconStarFilled } from '@move-in/move-in-design-system';

interface Props {
  id: string | number;
  className?: string;
}

const ProductAgentSection: React.FC<Props> = ({ className, id }) => {
  const { data } = useProductSuggestionDetail(id);

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          height: '370px',
          justifyContent: 'center',
          alignItems: 'center',
        }),
        className
      )}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <img
          className={css({
            borderRadius: '24px',
            objectFit: 'cover',
            width: '64px',
            height: '64px',
            marginBottom: '20px',
          })}
          src={data?.agent.profileImage}
          alt={`${data?.agent.name}-profile`}
        />
        <BoxLabel
          className={css({
            marginBottom: '12px',
          })}
        >
          {data?.agent.type}
        </BoxLabel>
        <div
          className={css({
            textStyle: 'body-18-m',
            color: 'text.dark.04',
            marginBottom: '4px',
          })}
        >
          {data?.agent.name}
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              textStyle: 'body-14-r',
              color: 'text.dark.04',
            })}
          >
            <IconStarFilled
              className={css({
                color: 'brand.purple.03',
              })}
              size={16}
            />
            <span>{data?.agent.reviewScore ?? 0}</span>
          </div>
          <div
            className={css({
              textStyle: 'body-14-r',
              color: 'text.dark.01',
            })}
          >{`(리뷰 ${data?.agent.reviewCount ?? 0}개)`}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductAgentSection;
