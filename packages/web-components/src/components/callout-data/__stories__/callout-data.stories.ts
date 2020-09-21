/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../callout-data';
// import readme from './README.stories.mdx';

export const Default = () => html`
  <div class="bx--grid" style="width: 100%">
    <div class="bx--row">
      <div class="bx--offset-lg-4">
        <dds-callout-data>
        <span slot="data">51%</span>
        <span slot="copy">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        </span>
        <span slot="source">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </span>
      </dds-callout-data>
      </div>
    </div>
  </div>
`;

export default {
  title: 'Components/Callout Data',
  parameters: {
    // ...readme.parameters,
    hasGrid: true,
  },
};
