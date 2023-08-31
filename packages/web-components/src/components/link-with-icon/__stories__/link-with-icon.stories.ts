/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';
import { CTA_TYPE } from '../../cta/defs';

import { ICON_PLACEMENT } from '../link-with-icon';

import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Default = (args) => {
  const { copy, ctaType, disabled, download, href, onClick, iconPlacement } =
    args?.LinkWithIcon ?? {};
  return html`
    <c4d-video-cta-container>
      <c4d-link-with-icon
        icon-placement="${iconPlacement}"
        ?disabled="${disabled}"
        href="${href}"
        download=${download}
        cta-type="${ctaType}"
        @click="${onClick}">
        ${copy}
      </c4d-link-with-icon>
    </c4d-video-cta-container>
  `;
};

const placementTypes = {
  [`${ICON_PLACEMENT.LEFT}`]: ICON_PLACEMENT.LEFT,
  [`${ICON_PLACEMENT.RIGHT}`]: ICON_PLACEMENT.RIGHT,
};

export default {
  title: 'Components/Link with icon',
  decorators: [(story) => html` <div class="cds--grid">${story()}</div> `],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LinkWithIcon: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );
        const copy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Link text (unnamed slot)', 'Link text');
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        return {
          ctaType,
          copy,
          disabled: boolean('Disabled (disabled)', false),
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          onClick: action('click'),
          iconPlacement: select(
            'Icon Position (icon-placement):',
            placementTypes,
            placementTypes[`${ICON_PLACEMENT.RIGHT}`]
          ),
        };
      },
    },
    propsSet: {
      default: {
        LinkWithIcon: {
          children: 'Link text',
          disabled: false,
          href: 'https://github.com/carbon-design-system/carbon-web-components',
          onClick: 'click',
          iconPlacement: 'right',
        },
      },
    },
  },
};
