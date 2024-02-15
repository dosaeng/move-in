import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Divider } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';
import FilterNotificationNudgeBanner from '../components/FilterNotificationNudgeBanner';
import HomePageHeader from '../components/HomePageHeader';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <HomePageHeader
          onClickMenu={() => {
            navigate('/service');
          }}
        />
      </IonHeader>
      <IonContent>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',

            height: '100%',
            paddingY: '24px',
          })}
        >
          <HomePageHeaderSection />
          <Divider />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

const HomePageHeaderSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingX: '20px',
        paddingBottom: '40px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <div
          className={css({
            textStyle: 'header-20-sb',
            color: 'text.dark.04',
          })}
        >
          돈 벌고 싶은자, 검색해라
        </div>
        <div
          className={css({
            textStyle: 'header-14-r',
            color: 'text.dark.01',
          })}
        >
          아무거나 던져봐라 우리가 다 찾아줄게
        </div>
      </div>
      <SearchBar
        onClick={() => {
          navigate('/search');
        }}
      />
      <FilterNotificationNudgeBanner
        onClick={() => {
          // TODO. 맞춤 필터 페이지로 이동
        }}
      />
    </div>
  );
};
