/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import ContentItemHorizontal from '../ContentItemHorizontal';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|ContentItemHorizontal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const items = [
      {
        eyebrow: 'eyebrow',
        heading: 'heading',
        copy: 'copy',
        cta: object('cta', {
          type: 'local',
          copy: 'click here',
          icon: {
            src: ArrowRight20,
          },
          href: 'https://example.com',
        }),
      },
      {
        eyebrow: 'eyebrow',
        heading: 'heading',
        copy: 'copy',
        cta: object('cta', {
          type: 'local',
          copy: 'click here',
          icon: {
            src: ArrowRight20,
          },
          href: 'https://example.com',
        }),
      },
    ];

    return <ContentItemHorizontal items={items} />;
  });
