import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import README from '../../README.md';

storiesOf('Overview', module)
  .addDecorator(storyFn => (
    <div className="storybook-center-container">{storyFn()}</div>
  ))
  .add('Get Started', withDocs(README, () => <div />));
