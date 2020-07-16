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
import { boolean } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-custom-elements/es/icons/arrow--right/20';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../link-with-icon';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { children, disabled, href, onClick } = parameters?.props?.['dds-link-with-icon'] ?? {};
  return html`
    <dds-link-with-icon ?disabled="${disabled}" href="${ifNonNull(href)}" @click="${onClick}">
      ${children}${ArrowRight20({ slot: 'icon' })}
    </dds-link-with-icon>
  `;
};

export default {
  title: 'Components/Link with icon',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-link-with-icon': ({ groupId }) => ({
        children: textNullable('Link text (unnamed slot)', 'Link text', groupId),
        disabled: boolean('Disabled (disabled)', false, groupId),
        href: textNullable('Link href (href)', 'https://github.com/carbon-design-system/carbon-custom-elements', groupId),
        onClick: action('click'),
      }),
    },
  },
};
