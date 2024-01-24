import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  onClick?: () => void;
}

const FilterNotificationNudgeBanner: React.FC<Props> = ({
  className,
  onClick,
}) => {
  return (
    <div
      className={cx(
        css({
          borderY: '1px solid',
          borderYColor: 'stroke.light.01',
          padding: '20px 15px 20px 12px',
          display: 'flex',
          alignItems: 'center',
        }),
        className
      )}
    >
      <img
        className={css({
          borderRadius: '50%',
          marginRight: '16px',
        })}
        src="https://placehold.co/40x40/png"
      />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        })}
      >
        <div
          className={css({
            textStyle: 'body-12-r',
            color: 'text.dark.01',
          })}
        >
          얼마나 싸게 살 수 있을까?
        </div>
        <div
          className={css({
            textStyle: 'body-16-m',
            color: 'text.dark.04',
          })}
        >
          관심 매물 알림 받기
        </div>
      </div>
      <div
        className={css({
          textStyle: 'body-12-m',
          color: 'text.dark.03',
          padding: '8px 17px 7px 18px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'stroke.light.02',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
        onClick={onClick}
      >
        조건 입력
      </div>
    </div>
  );
};

export default FilterNotificationNudgeBanner;
