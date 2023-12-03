import { defineUtility } from '@pandacss/dev';

export const shadow = defineUtility({
  values: ['none', '01', '02', '03'],
  transform(value) {
    switch (value) {
      case 'none':
        return { boxShadow: 'none' };
      case '01':
        return { boxShadow: '0px 1px 2px rgba(117, 117, 117, 0.16)' };
      case '02':
        return { boxShadow: '0px 2px 4px rgba(117, 117, 117, 0.16)' };
      case '03':
        return { boxShadow: '0px 4px 8px rgba(117, 117, 117, 0.16)' };
    }
  },
});
