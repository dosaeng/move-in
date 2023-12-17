import { IonSkeletonText } from '@ionic/react';
import { ChipButtonList } from '@move-in/design-system';
import { css, sva } from '@move-in/styled-system/css';
import { differenceInCalendarDays } from 'date-fns';
import { ProductFilterListItemModel, ProductSuggestionState } from '../hooks/useProductFilterList';

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
      borderWidth: '1px',
      borderStyle: 'solid',
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
      backgroundColor: 'fill.light.01',
      color: 'text.dark.01',
      borderRadius: '12px',
      textStyle: 'body-14-m',
      height: 'fit-content',
    },
  },
  variants: {
    suggestionState: {
      [ProductSuggestionState.NONE]: {
        label: {
          display: 'none',
        },
      },
      [ProductSuggestionState.REQUESTED]: {
        root: {
          backgroundColor: 'fill.light.02',
        },
        label: {
          color: 'brand.purple.03',
        },
      },
      [ProductSuggestionState.CONSULTING_REQUESTED]: {
        root: {
          backgroundColor: '#F6F3FF',
        },
        label: {
          backgroundColor: 'brand.purple.03',
          color: 'text.light.01',
        },
      },
    },
  },
});

interface Props {
  data: ProductFilterListItemModel;
  onClick?: () => void;
}

const ProductFilterListItem: React.FC<Props> = ({ data, onClick }) => {
  const classes = styles({
    suggestionState: data.suggestionState,
  });
  // TODO. PandaCss 에서 되지 않아 임시 처리
  const backgroundColor = data.suggestionState === ProductSuggestionState.CONSULTING_REQUESTED ? '#F6F3FF' : undefined;

  return (
    <div
      className={classes.root}
      onClick={onClick}
      style={{
        backgroundColor,
      }}
    >
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
      <ChipButtonList options={data.filterList.slice(0, 4)} readOnly/>
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
  const { dueDate } = data;

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
  const { suggestionState } = data;

  if (suggestionState === ProductSuggestionState.REQUESTED) {
    return <>제안 검토중</>;
  }

  if (suggestionState === ProductSuggestionState.CONSULTING_REQUESTED) {
    return <>상담 요청</>;
  }

  return <></>;
};

export default ProductFilterListItem;
