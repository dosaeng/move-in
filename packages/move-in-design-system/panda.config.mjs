import { defineConfig } from '@pandacss/dev';
import { textStyles } from './src/theme/typography';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
    },
  },

  // The output directory for your css system
  emitPackage: true,
  outdir: '@move-in/move-in-design-system',
});
