/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text, withKnobs } from '@storybook/addon-knobs';
import ContentSection from '../ContentSection';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

export default {
  title: 'Patterns (Sub-Patterns)|ContentSection',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
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
};
