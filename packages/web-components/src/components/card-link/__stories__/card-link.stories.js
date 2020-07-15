/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-custom-elements/es/icons/arrow--right/20';
import '../card-link';

export const Default = () => {
  return html`
    <dds-card-link disabled href="https://www.example.com">
      <p>It's really great to meet you!</p>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-card-link>
  `;
};

export default {
  title: 'Components/Card Link',
};
