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
import readme from './README.stories.mdx';
import '../index';
import { CTA_TYPE } from '../../cta/defs';

import {
  hrefsForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Default = (args) => {
  const { buttons } = args?.ButtonGroup ?? {};
  return html`
    <c4d-video-cta-container>
      <c4d-button-group>
        ${buttons.map(
          (elem) => html`
            <c4d-button-group-item
              href="${hrefsForType[elem.ctaType]}"
              cta-type="${elem.ctaType}"
              download="IBM_Annual_Report_2019.pdf"
              >${elem.copy}</c4d-button-group-item
            >
          `
        )}
      </c4d-button-group>
    </c4d-video-cta-container>
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
          copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
          ctaType: select(
            `CTA type (cta-type) ${i + 1}`,
            typeOptions,
            types[CTA_TYPE.LOCAL]
          ),
        })),
      }),
    },
    propsSet: {
      default: {
        ButtonGroup: {
          buttons: [
            {
              ctaType: CTA_TYPE.LOCAL,
              copy: 'Lorem Ipsum',
            },
            {
              ctaType: CTA_TYPE.LOCAL,
              copy: 'Lorem Ipsum',
            },
          ],
        },
      },
    },
  },
};
