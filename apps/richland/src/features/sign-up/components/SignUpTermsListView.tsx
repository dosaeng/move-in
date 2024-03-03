import { TermModel } from '@/features/terms/hooks/useTerms';
import { css } from '@move-in/styled-system/css';
import CheckTermsListItem from '../../terms/components/CheckTermsListItem';
import { Browser } from '@capacitor/browser';

const SignUpTermsListView: React.FC<{
  value?: number[];
  onChange?: (value: number[]) => void;
  data?: TermModel[];
  isLoading: boolean;
}> = ({ data, isLoading = false, value, onChange }) => {
  if (isLoading) {
    return <></>;
  }

  if (!data) return <></>;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        textStyle: 'header-18-sb',
        gap: '15px',
      })}
    >
      {data.map((item) => {
        return (
          <CheckTermsListItem
            key={item.id}
            label={`${item.required ? '(필수)' : '(선택)'} ${item.title}`}
            checked={value?.includes(item.id)}
            onChange={() => {
              if (value?.includes(item.id)) {
                onChange && onChange(value.filter((id) => id !== item.id));
              } else {
                onChange && onChange([...(value || []), item.id]);
              }
            }}
            onDetail={() => {
              Browser.open({ url: item.url });
            }}
          />
        );
      })}
    </div>
  );
};

export default SignUpTermsListView;
