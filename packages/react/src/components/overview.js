import React from 'react';
import README from '../../README.md';
import { withDocs } from 'storybook-readme';

export default {
  title: 'Overview|Get Started',
  parameters: {
    percy: {
      skip: true,
    },
  },
  decorators: [
    storyFn => <div className="storybook-center-container">{storyFn()}</div>,
  ],
};

export const Default = withDocs(README, () => <div />);
