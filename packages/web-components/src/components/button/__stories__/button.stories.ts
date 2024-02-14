/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { types } from '../../cta/__stories__/ctaTypeConfig';
import '../button';
import '../../video-player/video-player-container';

const controls = {
  ctaType: {
    control: 'select',
    description: 'Specify the kind of button you want to create',
    options: types,
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the button should be disabled or not',
  },
  download: {
    control: 'boolean',
    description: 'Specify whether the button is type download',
  },
};

export const Default = {
  argTypes: controls,
  render: ({ ctaType, disabled, download }) => html`
    <c4d-video-cta-container>
      <c4d-button
        ?disabled="${disabled}"
        href="http://www.example.com"
        download=${download}
        cta-type="${ctaType}">
        button
      </c4d-button>
    </c4d-video-cta-container>
  `,
};

const meta = {
  title: 'Components/Button',
};

export default meta;
