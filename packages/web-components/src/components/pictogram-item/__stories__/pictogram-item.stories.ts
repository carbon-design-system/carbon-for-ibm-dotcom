/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../pictogram-item';
import '../../link-with-icon/link-with-icon';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';

// import readme from './README.stories.mdx';

export const Default = () => html`
  <div>
    <div>
      <div>
        <dds-pictogram-item>
          <span slot="heading">Lorem ipsum dolor sit</span>
          <span slot="copy">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam
          </span>
          <dds-link-with-icon slot="cta">
            Lorem ipsum dolor ${ArrowRight20({ slot: 'icon' })}
          </dds-link-with-icon>
        </dds-pictogram-item>
      </div>
    </div>
  </div>
`;

export default {
  title: 'Components/Pictogram Item',
  parameters: {
    // ...readme.parameters,
    hasGrid: true,
  },
};
