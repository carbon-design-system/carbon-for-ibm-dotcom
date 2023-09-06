/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import ArrowDown20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--down/20.js';
import Pdf20 from '../../../internal/vendor/@carbon/web-components/icons/PDF/20.js';
import readme from './README.stories.mdx';
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';

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

export const Default = (args) => {
  const { buttons } = args?.ButtonGroup ?? {};
  return html`
    <c4d-button-group>
      ${buttons.map(
        (elem) => html`
          <c4d-button-group-item href="${elem.href}"
            >${elem.copy}${elem.renderIcon}</c4d-button-group-item
          >
        `
      )}
    </c4d-button-group>
  `;
};

export default {
  title: 'Components/Button group',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-16 cds--col-md-6 cds--col-lg-16">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ButtonGroup: () => ({
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => ({
          href: textNullable(`Link ${i + 1}`, `https://example.com`),
          copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
          renderIcon:
            iconMap[
              select(`Icon ${i + 1}`, iconOptions, iconOptions.Default) ?? 0
            ],
        })),
      }),
    },
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
