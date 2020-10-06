/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import Pdf20 from 'carbon-web-components/es/icons/PDF/20.js';
import readme from './README.stories.mdx';
import '../button-group';
import '../button-group-item';
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

export const Default = ({ parameters }) => {
  const { buttons } = parameters?.props?.ButtonGroup ?? {};
  return html`
    <div>
      <dds-button-group>
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
    </div>
  `;
};

export default {
  title: 'Components/Button Group',
  decorators: [
    story => html`
      <div class="bx--grid bx--grid--condensed" style="width: 100%">
        <div class="bx--row">
          <div class="bx--col-sm-16 bx--col-md-6 bx--col-lg-16">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      ButtonGroup: ({ groupId }) => ({
        buttons: Array.from({
          length: number('Number of buttons', 2, {}, groupId),
        }).map((_, i) => ({
          href: textNullable(`Link ${i + 1}`, `https://example.com`, groupId),
          copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
          renderIcon: iconMap[select(`Icon ${i + 1}`, iconOptions, iconOptions.Default, groupId) ?? 0],
        })),
      }),
    },
  },
};
