/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import readme from './README.stories.react.mdx';

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

export const Default = ({ parameters }) => {
  const { type, size, contrast, weight } = parameters?.props?.HorizontalRule ?? {};
  return <DDSHorizontalRule type={type} size={size} contrast={contrast} weight={weight}></DDSHorizontalRule>;
};

Default.story = {
  parameters: {
    knobs: {
      HorizontalRule: ({ groupId }) => ({
        type: select('Type (type):', types, types.solid, groupId),
        size: select('Size (size):', sizes, sizes.fluid, groupId),
        contrast: select('Contrast (contrast):', contrasts, contrasts['medium-contrast'], groupId),
        weight: select('Weight (weight):', weights, weights.thin, groupId),
      }),
    },
    propsSet: {
      default: {
        HorizontalRule: {
          type: types.solid,
          size: sizes.fluid,
          contrast: contrasts['medium-contrast'],
          weight: weights.thin,
        },
      },
    },
  },
};

export default {
  title: 'Components/Horizontal Rule',
  decorators: [
    story => {
      return (
        <div className="bx--grid bx--grid--condensed">
          <div className="bx--row">
            <div className="bx--col-lg-12">
              <h2>Horizontal Rule</h2>
              {story()}
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
