/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import HorizontalRule from '../HorizontalRule';
import React from 'react';
import readme from '../README.stories.mdx';

const styles = {
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
  title: 'Components|HorizontalRule',

  parameters: {
    ...readme.parameters,
    knobs: {
      HorizontalRule: ({ groupId }) => ({
        style: select('style', styles, styles.solid, groupId),
        size: select('size', sizes, sizes.fluid, groupId),
        contrast: select(
          'contrast',
          contrasts,
          contrasts['medium-contrast'],
          groupId
        ),
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
  const { style, size, contrast } = parameters?.props?.HorizontalRule ?? {};
  const { words } = parameters?.props?.Other ?? {};

  return (
    <div>
      <h1>
        <b>Grid with no Gutter</b>
      </h1>
      <div className="bx--grid" style={{ marginBottom: '50px' }}>
        <div className="bx--row bx--no-gutter">
          <div className="bx--col">
            <HorizontalRule
              style={style}
              size={size}
              contrast={contrast}
              weight={select('weight', weights, weights.thin)}
            />
          </div>
        </div>
      </div>

      <h1>
        <b>Grid with Gutter</b>
      </h1>
      <div className="bx--grid bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col">
            <h4>{words}</h4>
            <HorizontalRule
              style={style}
              size={size}
              contrast={contrast}
              weight={select('weight', weights, weights.thin)}
            />
            <h4>{words}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
