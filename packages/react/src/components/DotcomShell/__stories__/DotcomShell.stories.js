import React from 'react';
import { storiesOf } from '@storybook/react';
import DotcomShell from '../DotcomShell';
import mastheadLinks from '../../Masthead/__stories__/data/MastheadLinks.js';
import '@ibmdotcom/styles/scss/components/dotcom-shell/_dotcom-shell.scss';

const rows = [];
const content = (
  <div className="bx--col-lg-13">
    <p style={{ paddingBottom: '1rem' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </div>
);

for (let i = 0; i < 10; i++) {
  rows.push(content);
}

storiesOf('UI Shell', module).add('Default', () => (
  <DotcomShell navigation={mastheadLinks} content={rows} />
));
