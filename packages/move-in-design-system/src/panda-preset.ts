import { definePreset } from '@pandacss/dev';
import { textStyles } from './theme/typography';
import { colors } from './theme/colors';

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
});
