import type { Preview } from '@storybook/react';
import { setupIonicReact } from '@ionic/react';

import '../src/index.css';

setupIonicReact({
  mode: 'md',
});

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
