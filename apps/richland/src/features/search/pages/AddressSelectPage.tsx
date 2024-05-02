import EmptyView from '@/common/components/EmptyView';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { PageHeader, SearchInput } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddressSelectorList from '../components/address/AddressSelectorList';
import { useState } from 'react';
import useSearchFormContext from '../hooks/useSearchFormContext';

const AddressSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get('parentId');
  const [keyword, setKeyword] = useState<string>('');
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
        />
      </IonHeader>
      <IonToolbar
        className={css({
          paddingTop: '24px',
          paddingX: '16px',
        })}
      >
        <SearchInput
          placeholder="주소를 검색해주세요"
          defaultValue={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </IonToolbar>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '24px',
        })}
      >
        {parentId != null ? (
          <AddressSelectorList
            parentId={parentId}
            filterKeyword={keyword}
            selectedItems={value.addressList}
            onClickItem={(item) => {
              if (value.addressList.some((i) => i.id === item.id)) {
                updateValue({
                  addressList: value.addressList.filter((i) => i.id !== item.id),
                });
                return;
              }

              updateValue({
                addressList: [...value.addressList, item],
              });
            }}
          />
        ) : (
          <EmptyView>주소 데이터가 없습니다.</EmptyView>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddressSelectPage;
