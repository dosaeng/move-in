import { AgentScoreBar, BoxLabel, ProfileImage } from '@move-in/design-system';
import { css, cx } from '@move-in/styled-system/css';
import useProductSuggestionDetail from '../../hooks/useProductSuggestionDetail';

interface Props {
  id: string | number;
  className?: string;
}

const ProductAgentSection: React.FC<Props> = ({ className, id }) => {
  const { data } = useProductSuggestionDetail(id);

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          height: '370px',
          justifyContent: 'center',
          alignItems: 'center',
        }),
        className
      )}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <ProfileImage src={data?.agent.profileImage} alt={`${data?.agent.name}-profile`} />
        <BoxLabel
          className={css({
            marginBottom: '12px',
          })}
        >
          {data?.agent.type}
        </BoxLabel>
        <div
          className={css({
            textStyle: 'body-18-m',
            color: 'text.dark.04',
            marginBottom: '4px',
          })}
        >
          {data?.agent.name}
        </div>
        <AgentScoreBar reviewCount={data?.agent.reviewCount} reviewScore={data?.agent.reviewScore} />
      </div>
    </div>
  );
};

export default ProductAgentSection;
