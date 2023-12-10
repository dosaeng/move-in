import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import DateInputField from '../../components/create/base/DateInputField';
import StepIndicator from '../../components/create/base/StepIndicator';

const ProductFilterCreateFormStep2Page = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                history.goBack();
              }}
            />
          }
          right={
            <PageHeaderCloseButton
              onClick={() => {
                history.replace('/product-filters');
              }}
            />
          }
          title="나의 관심 설정 2단계"
        />
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
          '--padding-start': '16px',
          '--padding-end': '16px',
        })}
      >
        <StepIndicator className={css({ marginBottom: '12px' })} step={2} maxStep={5} />
        <h2 className={css({ textStyle: 'header-24-sb', color: 'text.dark.04', marginBottom: '8px' })}>
          희망 입주 시기
        </h2>
        <div className={css({ textStyle: 'header-14-r', color: 'text.dark.02', marginBottom: '40px' })}>
          개략적인 시기를 알려주시면 더 좋은 추천을 해드려요
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <DateInputField id="start-date" suffix="이후" />
          <DateInputField id="end-date" suffix="까지" />
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            onClick={() => {
              history.push('/product-filters-create/step3');
            }}
            label={'다음'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep2Page;
