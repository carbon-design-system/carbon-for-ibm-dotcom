/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_SIMPLE_OVERVIEW } from '../../../internal/FeatureFlags';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import './index.scss';
import SimpleOverview from '../SimpleOverview';
import readme from '../README.md';

if (DDS_SIMPLE_OVERVIEW) {
  storiesOf('Simple Overview', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const label = text(
        'Label (required):',
        'Lorem ipsum dolor sit amet, consectetur'
      );
      const heading = text(
        'Heading (required):',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
      );
      const copy = text(
        'Copy (required):',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      );

      const targets = {
        self: '_self',
        blank: '_blank',
      };

      const linkActive = boolean('Link');

      /**
       * Enables the link if linkActive is true
       *
       * @returns {object} Link object
       */
      const link = () => {
        if (linkActive) {
          return {
            copy: text('Link copy:', 'Lorem Ipsum'),
            href: text('Link href:', 'https://www.example.com'),
            target: select('Link target:', targets, targets.blank),
          };
        } else {
          return false;
        }
      };
      return (
        <SimpleOverview
          label={label}
          heading={heading}
          copy={copy}
          link={link()}
        />
      );
    });
}
