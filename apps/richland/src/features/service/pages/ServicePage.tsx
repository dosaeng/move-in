import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Divider, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css, cx } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';
import ServicePageListGroup from '../components/ServicePageListGroup';
import ServicePageListItem from '../components/ServicePageListItem';
import ServicePageListNotificationItem from '../components/ServicePageListNotificationItem';
import ServicePageNavigationBar from '../components/ServicePageNavigationBar';
import ServicePageListAppVersionItem from '../components/ServicePageListAppVersionItem';
import ServicePageListLogoutItem from '../components/ServicePageListLogoutItem';

const horizontalPadding = css({
  paddingX: '20px',
});

const ServicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                navigate('/');
              }}
            />
          }
        />
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
      >
        <div
          className={cx(
            css({
              display: 'flex',
              flexDirection: 'column',
            }),
            horizontalPadding
          )}
        >
          <h2
            className={css({
              textStyle: 'header-24-sb',
              color: 'text.dark.04',
              marginBottom: '40px',
            })}
          >
            더보기
          </h2>
          <ServicePageNavigationBar
            className={css({
              marginBottom: '48px',
              alignSelf: 'center',
            })}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <ServicePageListGroup className={horizontalPadding} title="내 정보">
            <ServicePageListItem title="회원 정보 수정" />
            <ServicePageListItem title="결제 내역 조회" />
          </ServicePageListGroup>
          <Divider size="m" />
          <ServicePageListGroup className={horizontalPadding} title="고객 지원">
            <ServicePageListItem title="고객센터" />
            <ServicePageListItem title="스토어 리뷰하기" />
            <ServicePageListItem title="제안하기" />
          </ServicePageListGroup>
          <Divider size="m" />
          <ServicePageListGroup className={horizontalPadding} title="앱 정보">
            <ServicePageListItem title="이용 약관 및 개인정보 수집 이용" />
            <ServicePageListItem title="오픈소스 라이선스" />
            <ServicePageListAppVersionItem />
          </ServicePageListGroup>
          <Divider size="m" />
          <ServicePageListGroup className={horizontalPadding} title="앱 설정">
            <ServicePageListNotificationItem />
            <ServicePageListLogoutItem />
          </ServicePageListGroup>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ServicePage;
