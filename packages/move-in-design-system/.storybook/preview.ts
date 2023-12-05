import type { Preview } from '@storybook/react';
import { setupIonicReact } from '@ionic/react';

import '../src/index.scss';


setupIonicReact();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
