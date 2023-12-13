import { sva } from '@move-in/styled-system/css';

const styles = sva({
  slots: ['title', 'subtitle'],
  base: {
    title: {
      textStyle: 'header-24-sb',
      color: 'text.dark.04',
      marginBottom: '8px',
    },
    subtitle: {
      textStyle: 'header-14-r',
      color: 'text.dark.02',
      marginBottom: '40px',
    },
  },
  variants: {
    hasSubtitle: {
      false: {
        title: {
          marginBottom: '40px',
        },
      },
    },
  },
});

interface Props {
  title: React.ReactNode;
  subtitle?: string;
}

const ProductFilterCreateFormHeader: React.FC<Props> = ({ title, subtitle }) => {
  const hasSubtitle = !!subtitle;
  const classes = styles({ hasSubtitle });

  return (
    <div>
      <h2 className={classes.title}>{title}</h2>
      {hasSubtitle && <div className={classes.subtitle}>{subtitle}</div>}
    </div>
  );
};

export default ProductFilterCreateFormHeader;
