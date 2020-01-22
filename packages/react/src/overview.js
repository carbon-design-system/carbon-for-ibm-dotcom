/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import README from '../README.md';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';

storiesOf('Overview|Get Started', module)
  .addDecorator(storyFn => (
    <div className="storybook-center-container">{storyFn()}</div>
  ))
  .add('Read Me', withDocs(README, () => <div />));
