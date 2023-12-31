import { AgentScoreBar, BoxLabel, ProfileImage } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';
import useProfile from '../hooks/useProfile';
import { IonSkeletonText } from '@ionic/react';

interface Props {
  className?: string;
}

const ProfileSection: React.FC<Props> = ({ className }) => {
  const { data } = useProfile();

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingX: '16px',
          paddingY: '24px',
        }),
        className
      )}
    >
      <div
        className={css({
          display: 'flex',
          gap: '8px',
        })}
      >
        <BoxLabel>
          {data != null ? (
            data?.type
          ) : (
            <div style={{ width: '80px', height: '12px' }}></div>
          )}
        </BoxLabel>
      </div>
      <div
        className={css({
          display: 'flex',
          gap: '8px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
          })}
        >
          <div
            className={css({
              textStyle: 'header-24-sb',
              color: 'text.dark.04',
            })}
          >
            {data != null ? (
              data.name
            ) : (
              <IonSkeletonText
                animated
                style={{ width: '120px', height: '24px', borderRadius: '4px' }}
              />
            )}
          </div>
          <AgentScoreBar
            reviewCount={data?.reviewCount}
            reviewScore={data?.reviewScore}
          />
        </div>
        <ProfileImage src={data?.profileImage} alt={`${data?.name}-profile`} />
      </div>
    </div>
  );
};

export default ProfileSection;
