import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';
import SignUpTermsListView from '../components/SignUpTermsListView';
import useTerms from '@/features/terms/hooks/useTerms';
import { useState } from 'react';

const SignUpTermsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useTerms();
  const [agreedTermIds, setAgreedTermIds] = useState<number[]>([]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                navigate(-1);
              }}
            />
          }
        ></PageHeader>
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-start': '20px',
          '--padding-end': '20px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <h3
              className={css({
                textStyle: 'header-24-sb',
                color: 'text.dark.04',
              })}
            >
              회원 가입을 위해
              <br />
              본인 인증이 필요해요
            </h3>
            <p
              className={css({
                textStyle: 'body-16-m',
                color: 'text.dark.01',
              })}
            >
              리치랜드는 회원님의 정보를
              <br />
              철저히 보안처리하고 있어요
            </p>
          </div>
          <div
            className={css({
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              marginBottom: '20px',
            })}
          >
            <SignUpTermsListView
              data={data}
              isLoading={isLoading}
              value={agreedTermIds}
              onChange={setAgreedTermIds}
            />
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock className={css({ width: '100%' })}>
          <Button
            className={css({ maxWidth: '100%' })}
            label="약관 동의하고 본인 인증하기"
            onClick={() => {
              navigate('/identity-verification?redirect=/sign-up/complete');
            }}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default SignUpTermsPage;
