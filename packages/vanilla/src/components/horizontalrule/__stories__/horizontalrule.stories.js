/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../../styles/scss/components/horizontalrule/_horizontalrule.scss';
import '@carbon/grid/scss/grid.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { createElement } from 'react';
import { Description } from '@storybook/addon-docs/blocks';
import horizontalrule from '../horizontalrule.template';
import readme from '../README.md';
import wrapper from './templates/wrapper.template';

export default {
  title: 'Components|Horizontal Rule',
  decorators: [withKnobs],

  parameters: {
    docs: {
      page: () => createElement(Description, { markdown: readme }),
    },
  },
};

export const Default = () => {
  const styles = {
    solid: '',
    dashed: 'dashed',
  };

  const sizes = {
    small: 'small',
    medium: 'medium',
    large: 'large',
    fluid: '',
  };

  const contrasts = {
    'low-contrast': 'low',
    'medium-contrast': '',
    'high-contrast': 'high',
  };

  const weights = {
    thin: '',
    thick: 'thick',
  };

  const words = text(
    'text',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );

  return wrapper({
    words,
    hr: horizontalrule({
      style: select('style', styles, styles.solid),
      size: select('size', sizes, sizes.fluid),
      contrast: select('contrast', contrasts, contrasts.medium),
      weight: select('weight', weights, weights.thin),
    }),
  });
};
