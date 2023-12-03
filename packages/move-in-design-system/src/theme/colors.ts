import { defineTokens } from '@pandacss/dev';

export const colors = defineTokens.colors({
  // Text
  text: {
    light: {
      '01': { value: '#FFFFFF' },
      '02': { value: '#EEEEEE' },
      '03': { value: '#DDDDDD' },
      '04': { value: '#CCCCCC' },
    },
    dark: {
      '01': { value: '#888888' },
      '02': { value: '#666666' },
      '03': { value: '#444444' },
      '04': { value: '#111111' },
    },
  },
  fill: {
    light: {
      '01': { value: '#FFFFFF' },
      '02': { value: '#F6F6F6' },
      '03': { value: '#E6E6E6' },
    },
    dark: {
      '01': { value: '#2B2B2B' },
    },
  },
  stroke: {
    light: {
      '01': { value: '#F4F4F4' },
      '02': { value: '#E4E4E4' },
      '03': { value: '#D4D4D4' },
    },
    dark: {
      '01': { value: '#111111' },
    },
  },
  success: {
    green: {
      '01': { value: '#C1F9BD' },
      '02': { value: '#8AE582' },
      '03': { value: '#11D300' },
      '04': { value: '#19A70D' },
    },
  },
  warning: {
    yellow: {
      '01': { value: '#FFEBA4' },
      '02': { value: '#FFDF6F' },
      '03': { value: '#FFD233' },
      '04': { value: '#E9B500' },
    },
  },
  error: {
    red: {
      '01': { value: '#FFC7C7' },
      '02': { value: '#FF9797' },
      '03': { value: '#F54F4C' },
      '04': { value: '#BC0300' },
    },
  },
  brand: {
    purple: {
      '01': { value: '#E2C8FC' },
      '02': { value: '#BC8AEE' },
      '03': { value: '#874AC5' },
      '04': { value: '#58278A' },
    },
  },
});
