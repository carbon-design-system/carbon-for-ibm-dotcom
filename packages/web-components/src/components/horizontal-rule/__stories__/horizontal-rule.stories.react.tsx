/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable import/no-duplicates */
// @ts-ignore
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
// @ts-ignore
import { PropTypesRef } from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
/* eslint-enable import/no-duplicates */
import readme from './README.stories.react.mdx';

const types = ['solid', 'dashed'];

const sizes = ['small', 'medium', 'large', 'fluid'];

const contrasts = ['low-contrast', 'medium-contrast', 'high-contrast'];

const weights = ['thin', 'thick'];

export const Default = args => {
  const { type, size, contrast, weight } = args ?? {};
  return <DDSHorizontalRule type={type} size={size} contrast={contrast} weight={weight}></DDSHorizontalRule>;
};

export default {
  title: 'Components/Horizontal Rule',
  component: PropTypesRef,
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
  argTypes: {
    type: {
      control: { type: 'select' },
      options: types,
      defaultValue: 'solid',
    },
    size: {
      control: { type: 'select' },
      options: sizes,
      defaultValue: 'fluid',
    },
    contrast: {
      control: { type: 'select' },
      options: contrasts,
      defaultValue: 'medium-contrast',
    },
    weight: {
      control: { type: 'select' },
      options: weights,
      defaultValue: 'thin',
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
