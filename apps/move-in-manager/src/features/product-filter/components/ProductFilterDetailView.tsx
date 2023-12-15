import { differenceInCalendarDays } from 'date-fns';
import useProductFilterDetail from '../hooks/useProductFilterDetail';
import { cx, css } from '@move-in/styled-system/css';
import ProductSuggestionListView from './ProductSuggestionListView';
import useProductFilterDetailViewState from '../hooks/useProductFilterDetailViewState';
import { Divider, ProductFilterTagList } from '@move-in/move-in-design-system';

interface Props {
  className?: string;
  filterId: string;
}

const ProductFilterDetailView: React.FC<Props> = ({ className, filterId }) => {
  const { hasSuggestionList } = useProductFilterDetailViewState(filterId);
  const { data } = useProductFilterDetail(filterId);

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
        }),
        className
      )}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '20px',
          paddingX: '16px',
        })}
      >
        <h2
          className={css({
            textStyle: 'header-24-sb',
            color: 'text.dark.04',
          })}
        >
          {data?.name}
        </h2>
        <div
          className={css({
            textStyle: 'body-16-m',
            color: 'text.dark.01',
          })}
        >
          <DueDate date={data?.dueDate} />
        </div>
      </div>
      {hasSuggestionList && (
        <div
          className={css({
            marginTop: '20px',
          })}
        >
          <ProductSuggestionListView
            className={css({
              marginX: '16px',
              marginBottom: '8px',
            })}
            filterId={filterId}
          />
          <Divider
            className={css({
              marginY: '20px',
            })}
            size="m"
          />
        </div>
      )}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          paddingX: '16px',
        })}
      >
        <ProductFilterSubView title="함께 하는 가족">
          <ProductFilterTagList tags={data?.familyPreference ?? []} />
        </ProductFilterSubView>
        <ProductFilterSubView title="희망 입주 시기">
          <ProductFilterTagList tags={data?.moveInPreference ?? []} />
        </ProductFilterSubView>
        <ProductFilterSubView title="주거 비용 예산">
          <ProductFilterTagList tags={data?.costPreference ?? []} />
        </ProductFilterSubView>
        <ProductFilterSubView title="원하는 집의 조건">
          <ProductFilterSubTagView title="위치">
            <ProductFilterTagList tags={data?.productPreference.position ?? []} />
          </ProductFilterSubTagView>
          <ProductFilterSubTagView title="매물 구성">
            <ProductFilterTagList tags={data?.productPreference.type ?? []} />
          </ProductFilterSubTagView>
        </ProductFilterSubView>
        <ProductFilterSubView title="라이프 스타일">
          <ProductFilterSubTagView title="교통권">
            <ProductFilterTagList tags={data?.lifestylePreference.traffic ?? []} />
          </ProductFilterSubTagView>
          <ProductFilterSubTagView title="희망 구성 옵션">
            <ProductFilterTagList tags={data?.lifestylePreference.livingOption ?? []} />
          </ProductFilterSubTagView>
          <ProductFilterSubTagView title="공동 생활">
            <ProductFilterTagList tags={data?.lifestylePreference.communityLife ?? []} />
          </ProductFilterSubTagView>
          <ProductFilterSubTagView title="생활권">
            <ProductFilterTagList tags={data?.lifestylePreference.livingInfra ?? []} />
          </ProductFilterSubTagView>
          <ProductFilterSubTagView title="학군">
            <ProductFilterTagList tags={data?.lifestylePreference.educationLife ?? []} />
          </ProductFilterSubTagView>
          <ProductFilterSubTagView title="배달권">
            <ProductFilterTagList tags={data?.lifestylePreference.deliveryLife ?? []} />
          </ProductFilterSubTagView>
        </ProductFilterSubView>
      </div>
    </div>
  );
};

export default ProductFilterDetailView;

const DueDate: React.FC<{ date?: Date }> = ({ date }) => {
  if (date != null) {
    const days = differenceInCalendarDays(date, new Date());

    if (days < 0) {
      return <>제안이 마감됐어요</>;
    }

    if (days == 0) {
      return <>오늘 제안이 마감돼요</>;
    }

    return <>{days}일 뒤 제안이 마감돼요</>;
  }

  return <></>;
};

const ProductFilterSubView: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      })}
    >
      <div
        className={css({
          textStyle: 'body-14-sb',
          color: 'text.dark.04',
        })}
      >
        {title}
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        })}
      >
        {children}
      </div>
    </div>
  );
};

const ProductFilterSubTagView: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
      <div className={css({ textStyle: 'body-12-r', color: 'text.dark.01' })}>{title}</div>
      {children}
    </div>
  );
};
