/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

import '../cta-block';
import '../../content-item/content-item-heading';

export const Default = ({ parameters }) => {
  return html`
    <dds-cta-block>
      <span>How are you guys doing?</span>
    </dds-cta-block>
  `;
};

Default.story = {
  parameters: {
    // colLgClass: 'bx--col-lg-3',
    knobs: {},
  },
};

export default {
  title: 'Components/Cta Block',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return html`
        <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
          <div class="bx--row">
            <div class="bx--col-sm-4 ${colLgClass} bx--offset-lg-4">
              ${story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
};
