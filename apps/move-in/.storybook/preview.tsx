import { setupIonicReact } from '@ionic/react';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@move-in/design-system/src/index.scss';
import '../src/index.scss';
import React from 'react';

setupIonicReact({
  mode: 'md',
});

const queryClient = new QueryClient();

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
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
