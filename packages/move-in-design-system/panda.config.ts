import { defineConfig } from '@pandacss/dev';
import moveInPreset from './src/panda-preset';

export default defineConfig({
  presets: [moveInPreset],
  
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  emitPackage: true,
  outdir: '@move-in/styled-system',
});
