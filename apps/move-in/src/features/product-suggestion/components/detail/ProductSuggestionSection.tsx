import useProductSuggestionDetail, { ProductSuggestionDetailModel } from '../../hooks/useProductSuggestionDetail';
import { css } from '@move-in/styled-system/css';
import {
  ProductDepositFormat,
  DateFormat,
  ProductSuggestionRatingGraph,
  ProductSuggestionRatingView,
} from '@move-in/design-system';

interface Props {
  id: string | number;
}

const ProductSuggestionSection: React.FC<Props> = ({ id }) => {
  const { data } = useProductSuggestionDetail(id);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          marginBottom: '20px',
          textStyle: 'header-20-sb',
          color: 'text.dark.04',
          paddingX: '20px',
        })}
      >
        {data?.agent.name}의 코멘트
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        })}
      >
        <ProductSuggestionRatingGraph
          className={css({
            maxWidth: '360px',
          })}
          ratings={{
            familyPreference: data?.productSuggestion.familyPreference.score ?? 0,
            costPreference: data?.productSuggestion.costPreference.score ?? 0,
            lifestylePreference: data?.productSuggestion.lifestylePreference.score ?? 0,
            productPreference: data?.productSuggestion.productPreference.score ?? 0,
            moveInPreference: data?.productSuggestion.moveInPreference.score ?? 0,
          }}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          width: '100%',
          overflowX: 'hidden',
        })}
      >
        <ProductSuggestionRatingView title="함께 하는 가족" data={data?.productSuggestion.familyPreference} />
        <ProductSuggestionRatingView
          title="희망 입주 시기"
          data={data?.productSuggestion.moveInPreference}
          additionalContent={<ProductMoveInView data={data?.product} />}
          hideComment
        />
        <ProductSuggestionRatingView
          title="주거 비용 예산"
          data={data?.productSuggestion.costPreference}
          additionalContent={<ProductCostView data={data?.product} />}
        />
        <ProductSuggestionRatingView title="원하는 집의 조건" data={data?.productSuggestion.productPreference} />
        <ProductSuggestionRatingView title="라이프 스타일" data={data?.productSuggestion.lifestylePreference} />
      </div>
    </div>
  );
};

export default ProductSuggestionSection;

const ProductMoveInView: React.FC<{ data?: ProductSuggestionDetailModel['product'] }> = ({ data }) => {
  return (
    <div
      className={css({
        textStyle: 'body-16-m',
        color: 'text.dark.04',
        paddingX: '16px',
        paddingY: '20px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'stroke.light.02',
        backgroundColor: 'fill.light.01',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
      })}
    >
      <DateFormat date={data?.minimumMoveInDate} format="yy년 M월 d일" />
      부터 입주 가능
    </div>
  );
};

const ProductCostView: React.FC<{ data?: ProductSuggestionDetailModel['product'] }> = ({ data }) => {
  return (
    <div
      className={css({
        textStyle: 'body-16-m',
        color: 'text.dark.04',
        paddingX: '40px',
        paddingY: '20px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'stroke.light.02',
        backgroundColor: 'fill.light.01',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'space-around',
      })}
    >
      <ProductCostViewRow title="보증금">
        <ProductDepositFormat value={data?.deposit ?? 0} />
      </ProductCostViewRow>
      <div
        className={css({
          marginX: '16px',
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'stroke.light.02',
        })}
      />
      <ProductCostViewRow title="월고정비">
        <ProductDepositFormat value={data?.monthlyFixedCost ?? 0} />
      </ProductCostViewRow>
      <div
        className={css({
          marginX: '16px',
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'stroke.light.02',
        })}
      />
      <ProductCostViewRow title="비율 조정">{data?.isCostAdjustable ? '가능' : '불가능'}</ProductCostViewRow>
    </div>
  );
};

const ProductCostViewRow: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
      })}
    >
      <div
        className={css({
          textStyle: 'body-12-r',
          color: 'text.dark.01',
        })}
      >
        {title}
      </div>
      <div
        className={css({
          textStyle: 'body-16-m',
          color: 'text.dark.04',
        })}
      >
        {children}
      </div>
    </div>
  );
};
