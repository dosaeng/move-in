import { ProductUsage } from '@/features/product/product';
import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import { PageHeader, SearchInput } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsageSelectorList from '../components/usage/UsageSelectorList';
import useSearchFormContext from '../hooks/useSearchFormContext';

const UsageSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const {
    value: { usageList: selectedItems },
    updateValue,
  } = useSearchFormContext();
  const setSelectedItems = (items: ProductUsage[]) => {
    updateValue({
      usageList: items,
    });
  };

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
              navigate('/search');
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
              setSelectedItems([]);
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
