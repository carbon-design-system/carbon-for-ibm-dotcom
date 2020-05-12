/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, withKnobs } from '@storybook/addon-knobs';
import ContentSection from '../ContentSection';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Sub-Patterns)|ContentSection', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text(
      'Component heading(required):',
      'Lorem ipsum dolor sit amet'
    );
    const children = text('Children:', 'This is the Content Section children.');
    const themes = {
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
      white: '',
    };

    return (
      <ContentSection
        heading={heading}
        theme={select('theme', themes, themes.white)}
        children={children}
        customClassName={`${prefix}--content-section-story`}
      />
    );
  });
