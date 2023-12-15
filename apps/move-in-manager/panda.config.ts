import { defineConfig } from "@pandacss/dev";
import moveInPreset from '@move-in/move-in-design-system/src/panda-preset';

export default defineConfig({
  // Whether to use css reset
  presets: [moveInPreset],
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    '../../node_modules/@move-in/move-in-design-system/src/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  emitPackage: true,
  outdir: "@move-in/styled-system"
});
