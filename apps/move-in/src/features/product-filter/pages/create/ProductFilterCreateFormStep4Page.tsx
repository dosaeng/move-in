import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { useHistory } from 'react-router-dom';
import { css } from '@move-in/styled-system/css';
import PreferredRegionSelectBox from '../../components/create/form/PreferredRegionSelectBox';
import StepIndicator from '../../components/create/base/StepIndicator';
import ItemHouseTypeSelectBox from '../../components/create/form/ItemHouseTypeSelectBox';
import ItemHouseConditionSelectBox from '../../components/create/form/ItemHouseConditionSelectBox';
import ItemWishListSelectBox from '../../components/create/form/ItemWishListSelectBox';

const ProductFilterCreateFormStep4Page = () => {
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
          title="나의 관심 설정 4단계"
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
        <StepIndicator className={css({ marginBottom: '12px' })} step={4} maxStep={5} />
        <h2 className={css({ textStyle: 'header-24-sb', color: 'text.dark.04', marginBottom: '8px' })}>
          원하는 집의 조건
        </h2>
        <div className={css({ textStyle: 'header-14-r', color: 'text.dark.02', marginBottom: '40px' })}>
          원하는 조건을 알려주시면 딱 맞는 집을 추천해 드려요
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <PreferredRegionSelectBox />
          <ItemHouseTypeSelectBox />
          <ItemHouseConditionSelectBox />
          <ItemWishListSelectBox />
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
              history.push('/product-filters-create/step5');
            }}
            label={'다음'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep4Page;
