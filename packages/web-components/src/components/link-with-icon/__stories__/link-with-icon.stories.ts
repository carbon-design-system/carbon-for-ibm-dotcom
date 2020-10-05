/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';
import { LINK_ICON_PLACEMENT_TYPES } from '../link-with-icon';

export const Default = ({ parameters }) => {
  const { children, disabled, href, onClick, iconPlacement } = parameters?.props?.LinkWithIcon ?? {};
  return html`
    <dds-link-with-icon
      link-icon-placement="${iconPlacement}"
      ?disabled="${disabled}"
      href="${ifNonNull(href)}"
      @click="${onClick}"
    >
      ${children}${ArrowRight20({ slot: 'icon' })}
    </dds-link-with-icon>
  `;
};

const placementTypes = {
  [`${LINK_ICON_PLACEMENT_TYPES.DEFAULT}`]: LINK_ICON_PLACEMENT_TYPES.DEFAULT,
  [`${LINK_ICON_PLACEMENT_TYPES.RIGHT}`]: LINK_ICON_PLACEMENT_TYPES.RIGHT,
};

export default {
  title: 'Components/Link with icon',
  parameters: {
    ...readme.parameters,
    knobs: {
      LinkWithIcon: ({ groupId }) => ({
        children: textNullable('Link text (unnamed slot)', 'Link text', groupId),
        disabled: boolean('Disabled (disabled)', false, groupId),
        href: textNullable('Link href (href)', 'https://github.com/carbon-design-system/carbon-web-components', groupId),
        onClick: action('click'),
        iconPlacement: select(
          'Icon Position (icon-placement):',
          placementTypes,
          placementTypes[`${LINK_ICON_PLACEMENT_TYPES.DEFAULT}`],
          groupId
        ),
      }),
    },
  },
};
