import { ProductUsage } from '@/features/product/product';
import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import { PageHeader, SearchInput } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsageSelectorList from '../components/UsageSelectorList';

const UsageSelectPage: React.FC = () => {
  const nativate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<ProductUsage[]>([]);

  return (
    <IonPage>
      <PageHeader
        title={
          <span
            className={css({
              paddingLeft: '32px',
            })}
          >
            용도
          </span>
        }
        left={
          <PageHeaderBackButton
            onClick={() => {
              nativate(-1);
            }}
          />
        }
        right={
          <div
            className={css({
              textStyle: 'body-14-sb',
              color: 'brand.purple.03',
              whiteSpace: 'nowrap',
              paddingLeft: '16px',
              paddingY: '8px',
              cursor: 'pointer',
            })}
            onClick={() => {
              // TODO. 필터 초기화
            }}
          >
            초기화
          </div>
        }
      />
      <IonToolbar
        className={css({
          paddingTop: '24px',
          paddingX: '16px',
        })}
      >
        <SearchInput
          placeholder="용도를 검색해주세요"
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
        <UsageSelectorList
          filterKeyword={keyword}
          selectedItems={selectedItems}
          onClickItem={(item) => {
            const isSelected = selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            );

            if (isSelected) {
              setSelectedItems(
                selectedItems.filter((selectedItem) => selectedItem !== item)
              );
            } else {
              setSelectedItems([...selectedItems, item]);
            }
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default UsageSelectPage;
