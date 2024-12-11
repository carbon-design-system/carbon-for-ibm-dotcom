/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';
import { CTA_TYPE } from '../../cta/defs';

import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Default = (args) => {
  const { copy, customVideoTitle, ctaType, disabled, download, href } =
    args?.Button ?? {};

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
        ?disabled="${disabled}"
        href="${href}"
        download=${download}
        cta-type="${ctaType}">
        ${videoCopy ?? copy}
      </c4d-button>
    </c4d-video-cta-container>
  `;
};

export default {
  title: 'Components/Button',
  decorators: [(story) => html` <div class="cds--grid">${story()}</div> `],
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Button: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );
        const copy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Link text (unnamed slot)', 'Button text');
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;
        return {
          ctaType,
          copy,
          customVideoTitle,
          disabled: boolean('Disabled (disabled)', false),
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
    propsSet: {
      default: {
        Button: {
          copy: 'Button text',
          disabled: false,
          href: 'https://github.com/carbon-design-system/carbon-web-components',
        },
      },
    },
  },
};
