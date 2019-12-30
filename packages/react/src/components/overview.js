import README from '../../README.md';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';

storiesOf('Overview', module)
  .addDecorator(storyFn => (
    <div className="storybook-center-container">{storyFn()}</div>
  ))
  .add('Get Started', withDocs(README, () => <div />));
