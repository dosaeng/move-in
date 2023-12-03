import { definePreset } from '@pandacss/dev';
import { colors } from './theme/colors';
import { shadow } from './theme/effects';
import { textStyles } from './theme/typography';

export default definePreset({
  theme: {
    tokens: {
      colors: colors,
      fonts: {
        pretendard: { value: 'var(--font-pretendard), sans-serif' },
      },
    },
    extend: {
      textStyles,
    },
  },
  utilities: {
    extend: {
      mdsShadow: shadow,
    },
  },
});
