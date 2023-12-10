import { IonSkeletonText } from '@ionic/react';
import { css, sva } from '@move-in/styled-system/css';
import { differenceInCalendarDays } from 'date-fns';
import { ProductFilterListItemModel, ProductFilterState } from '../hooks/useProductFilterList';
import ProductFilterTagList from './ProductFilterTagList';

const styles = sva({
  slots: ['root', 'title', 'subtitle', 'label'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      borderRadius: '16px',
      backgroundColor: 'fill.light.01',
      padding: '16px',
      border: '1px solid',
      borderColor: 'stroke.light.02',
      cursor: 'pointer',
    },
    title: {
      textStyle: 'body-16-m',
      fontWeight: 'bold',
      color: 'text.dark.04',
    },
    subtitle: {
      textStyle: 'body-14-r',
      color: 'text.dark.02',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 12px',
      backgroundColor: 'fill.light.02',
      color: 'text.dark.01',
      borderRadius: '12px',
      textStyle: 'body-14-m',
      height: 'fit-content',
    },
  },
  variants: {
    state: {
      [ProductFilterState.DRAFT]: {
        root: {
          backgroundColor: 'fill.light.02',
        },
        label: {
          backgroundColor: 'fill.light.01',
          color: 'error.red.03',
        },
      },
      [ProductFilterState.PUBLISHED]: {
        root: {
          backgroundColor: 'fill.light.02',
        },
        label: {
          backgroundColor: 'fill.light.01',
          color: 'text.dark.01',
        },
      },
      [ProductFilterState.REQUESTED]: {
        label: {
          backgroundColor: 'fill.light.02',
          color: 'text.dark.01',
        },
      },
      [ProductFilterState.EXPIRED]: {
        root: {
          backgroundColor: 'fill.light.02',
        },
        label: {
          backgroundColor: 'fill.light.01',
          color: 'text.dark.01',
        },
      },
    },
    hasNewSuggestion: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      state: ProductFilterState.REQUESTED,
      hasNewSuggestion: true,
      css: {
        label: {
          backgroundColor: 'brand.purple.03',
          color: 'text.light.01',
        },
      },
    },
  ],
});

interface Props {
  data: ProductFilterListItemModel;
  onClick?: () => void;
}

const ProductFilterListItem: React.FC<Props> = ({ data, onClick }) => {
  const classes = styles({
    state: data.state,
    hasNewSuggestion: data.hasNewSuggestion,
  });

  return (
    <div className={classes.root} onClick={onClick}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <div className={classes.title}>{data.name}</div>
          <div className={classes.subtitle}>
            <ProductFilterListItemSubtitle data={data} />
          </div>
        </div>
        <div className={classes.label}>
          <ProductFilterListItemLabel data={data} />
        </div>
      </div>
      <ProductFilterTagList tags={data.filterList.slice(0, 4)} />
    </div>
  );
};

export const ProductFilterListItemSkeleton: React.FC = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <div className={classes.title}>
            <IonSkeletonText
              className={css({
                width: '200px',
                borderRadius: '8px',
              })}
              animated
            />
          </div>
          <div className={classes.subtitle}>
            <IonSkeletonText
              className={css({
                width: '80%',
                borderRadius: '8px',
              })}
              animated
            />
          </div>
        </div>
        <div className={classes.label}>
          <div
            className={css({
              width: '60px',
              height: '20px',
            })}
          />
        </div>
      </div>
      <div
        className={css({
          height: '56px',
        })}
      />
    </div>
  );
};

const ProductFilterListItemSubtitle: React.FC<{
  data: ProductFilterListItemModel;
}> = ({ data }) => {
  const { state, dueDate } = data;

  if (state === ProductFilterState.DRAFT) {
    return <>조건 작성을 마무리 해주세요</>;
  }

  if (state === ProductFilterState.PUBLISHED) {
    return <>잊지 않고 제안 요청을 해주세요</>;
  }

  if (state === ProductFilterState.EXPIRED) {
    return <>제안이 마감됐어요</>;
  }

  if (dueDate != null) {
    const days = differenceInCalendarDays(dueDate, new Date());

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

const ProductFilterListItemLabel: React.FC<{
  data: ProductFilterListItemModel;
}> = ({ data }) => {
  const { state, hasNewSuggestion, suggestionCount = 0 } = data;

  if (state === ProductFilterState.DRAFT) {
    return <>임시 저장</>;
  }

  if (state === ProductFilterState.PUBLISHED) {
    return <>요청 대기</>;
  }

  if (hasNewSuggestion) {
    return <>새로운 제안</>;
  }

  if (suggestionCount == 0 && state === ProductFilterState.REQUESTED) {
    return <>매물 검토중</>;
  }

  return (
    <>
      <span
        className={css({
          color: 'brand.purple.03',
          fontWeight: 'bold',
        })}
      >
        {suggestionCount ?? 0}건
      </span>
      의 제안
    </>
  );
};

export default ProductFilterListItem;
