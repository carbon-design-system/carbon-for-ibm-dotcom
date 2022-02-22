/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import HorizontalRule from '../HorizontalRule';
import React from 'react';
import readme from '../README.stories.mdx';

const types = {
  solid: undefined,
  dashed: 'dashed',
};

const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  fluid: undefined,
};

const contrasts = {
  'low-contrast': 'low-contrast',
  'medium-contrast': undefined,
  'high-contrast': 'high-contrast',
};

const weights = {
  thin: undefined,
  thick: 'thick',
};

export default {
  title: 'Components/Horizontal rule',
  parameters: {
    ...readme.parameters,
    knobs: {
      HorizontalRule: ({ groupId }) => ({
        type: select('type (type)', types, types.solid, groupId),
        size: select('size (size)', sizes, sizes.fluid, groupId),
        contrast: select(
          'contrast (contrast)',
          contrasts,
          contrasts['medium-contrast'],
          groupId
        ),
        weight: select('weight (weight)', weights, weights.thin, groupId),
      }),
      Other: ({ groupId }) => ({
        words: text(
          'text',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { type, size, contrast, weight } =
    parameters?.props?.HorizontalRule ?? {};
  const { words } = parameters?.props?.Other ?? {};

  return (
    <div>
      <h3>
        <b>Horizontal Rule in Grid with no Gutter</b>
      </h3>
      <div className="bx--grid bx--no-gutter" style={{ marginBottom: '50px' }}>
        <div className="bx--row">
          <div className="bx--col">
            {words}
            <HorizontalRule
              type={type}
              size={size}
              contrast={contrast}
              weight={weight}
            />
            {words}
          </div>
        </div>
      </div>

      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <h3>
              <b>Horizontal Rule in Grid with Gutter</b>
            </h3>
            {words}
            <HorizontalRule
              type={type}
              size={size}
              contrast={contrast}
              weight={weight}
            />
            {words}
          </div>
        </div>
      </div>
    </div>
  );
};
