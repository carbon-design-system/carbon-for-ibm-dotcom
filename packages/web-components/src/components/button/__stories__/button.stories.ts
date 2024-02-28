/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';
import { CTA_TYPE } from '../../cta/defs';
import '../button';
import '../../cta/video-cta-container';

const controls = {
  ctaType: {
    control: 'select',
    description: 'CTA type (cta-type)',
    options: typeOptions,
  },
  copy: {
    control: 'text',
    description: 'Link text (unnamed slot)',
    if: { arg: 'ctaType', neq: `${CTA_TYPE.VIDEO}` },
  },
  customVideoTitle: {
    control: 'text',
    description: 'Custom video title',
    if: { arg: 'ctaType', eq: `${CTA_TYPE.VIDEO}` },
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  download: {
    control: 'text',
    description: 'Download target (download)',
    if: { arg: 'ctaType', eq: `${CTA_TYPE.DOWNLOAD}` },
  },
  href: {
    control: 'text',
    description: knobNamesForType[CTA_TYPE.REGULAR],
  },
};

const defaultArgs = {
  ctaType: types[CTA_TYPE.LOCAL],
  copy: 'Button text',
  customVideoTitle: 'Custom video title',
  disabled: false,
  download: 'IBM_Annual_Report_2019.pdf',
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ copy, ctaType, customVideoTitle, disabled, download }) => {
    const href = hrefsForType[ctaType ?? CTA_TYPE.REGULAR];

    let videoCopy;

    if (ctaType === CTA_TYPE.VIDEO) {
      const button = document.querySelector('c4d-button') as any;
      const duration = button?.videoTitle?.match(/\((.*)\)/)?.pop();

      if (!customVideoTitle) {
        videoCopy = button?.videoTitle;
      } else {
        videoCopy = duration
          ? `${customVideoTitle} (${duration})`
          : customVideoTitle;
      }
    }

    return html`
      <c4d-video-cta-container>
        <c4d-button
          custom-video-title=${customVideoTitle}
          ?disabled="${disabled}"
          href="${href}"
          download=${download}
          cta-type="${ctaType}">
          ${videoCopy ?? copy}
        </c4d-button>
      </c4d-video-cta-container>
    `;
  },
};

const meta = {
  title: 'Components/Button',
};

export default meta;
