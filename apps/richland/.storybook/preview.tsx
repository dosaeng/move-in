import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { setupIonicReact } from '@ionic/react';
import '@move-in/design-system/src/index.css';
import React from 'react';
import '../src/index.css';

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
