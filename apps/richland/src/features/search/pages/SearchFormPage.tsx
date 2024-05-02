import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Divider, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { useNavigate } from 'react-router-dom';
import { css } from '@move-in/styled-system/css';
import UsageSelectorField from '../components/usage/UsageSelectorField';
import useSearchFormContext from '../hooks/useSearchFormContext';
import AddressSelectorField from '../components/address/AddressSelectorField';
import { getProductAddressIdPartsForLevel } from '@/features/product/utils/productAddressUtils';

const SearchFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { value, updateValue } = useSearchFormContext();

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
          title="상품 종합 검색"
        />
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '24px',
        })}
      >
        <UsageSelectorField
          className={css({
            paddingX: '20px',
          })}
          selectedItems={value.usageList}
          onClickDelete={(item) => {
            updateValue({
              usageList: value.usageList.filter((i) => i !== item),
            });
          }}
          onClickHeader={() => {
            navigate('/search/usage-select');
          }}
        />
        <Divider
          className={css({
            marginY: '32px',
          })}
        />
        <AddressSelectorField
          className={css({
            paddingX: '20px',
          })}
          selectedItems={value.addressList}
          onClickDelete={(target) => {
            if (target.level == 1) {
              updateValue({
                addressList: value.addressList.filter((item) => {
                  return item.id.startsWith(
                    getProductAddressIdPartsForLevel(target.id, 1)
                  );
                }),
              });
              return;
            }

            updateValue({
              addressList: value.addressList.filter(
                (item) => target.id !== item.id
              ),
            });
          }}
          onClickHeader={() => {
            navigate('/search/address-select');
          }}
          onClickGroupHeader={(item) => {
            navigate(`/search/address-select?parentId=${item.id}`);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default SearchFormPage;
