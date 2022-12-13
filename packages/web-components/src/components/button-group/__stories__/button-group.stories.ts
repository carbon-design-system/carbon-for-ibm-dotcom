/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import ArrowDown20 from '@carbon/web-components/es/icons/arrow--down/20.js';
import Pdf20 from '@carbon/web-components/es/icons/PDF/20.js';
import readme from './README.stories.mdx';
import '../index';

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  ArrowDown20: ArrowDown20({ slot: 'icon' }),
  Pdf20: Pdf20({ slot: 'icon' }),
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'Arrow Down': 'ArrowDown20',
  PDF: 'Pdf20',
};

export const Default = args => {
  const { numberOfButtons } = args;

  const buttons = Array.from({
    length: numberOfButtons,
  }).map((_, i) => ({
    href: `https://example.com`,
    copy: `Button ${i + 1}`,
    renderIcon: iconMap[iconOptions.Default ?? 0],
  }));

  return html`
    <dds-button-group>
      ${buttons.map(
        (elem) => html`
          <dds-button-group-item href="${elem.href}"
            >${elem.copy}${elem.renderIcon}</dds-button-group-item
          >
        `
      )}
    </dds-button-group>
  `;
};

export default {
  title: 'Components/Button group',
  components: 'dds-button-group',
  argTypes: {
    numberOfButtons: {
      control: { type: 'number' },
      defaultValue: 2,
    },
  },
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-16 bx--col-md-6 bx--col-lg-16">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        ButtonGroup: {
          buttons: [
            {
              href: 'https://example.com',
              copy: 'Lorem Ipsum',
            },
            {
              href: 'https://example.com',
              copy: 'Lorem Ipsum',
            },
          ],
        },
      },
    },
  },
};
