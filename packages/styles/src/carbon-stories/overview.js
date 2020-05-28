/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import README from '../../scss/themes/expressive/README.md';

storiesOf('Overview', module)
  .addParameters({
    info: {
      disable: true,
    },
  })
  .add(
    'Get Started',
    withDocs(README, () => <div/>),
  );
