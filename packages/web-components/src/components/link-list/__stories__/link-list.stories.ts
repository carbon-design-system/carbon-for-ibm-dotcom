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
import '../link-list';
import '../link-list-item';
import '../../card-link/card-link';
import '../../link-with-icon/link-with-icon';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { children, disabled, href, onClick } = parameters?.props?.['dds-link-list/default'] ?? {};
  return html`
    <dds-link-list type="default">
      <span slot="heading">Hey there</span>
      <dds-link-list-item>
        <dds-card-link href="https://example.com">
          Learn more ${ArrowRight20({ slot: 'footer' })}
        </dds-card-link>
      </dds-link-list-item>
      <dds-link-list-item>
        <dds-card-link href="https://example.com">
          Containerization A Complete Guide ${ArrowRight20({ slot: 'footer' })}
        </dds-card-link>
      </dds-link-list-item>
    </dds-link-list>
  `;
};

export const Horizontal = ({ parameters }) => {
  return html`
    <dds-link-list type="horizontal">
      <span slot="heading">Hey there</span>
      <dds-link-list-item>
        <dds-link-with-icon>
          Learn more ${ArrowRight20({ slot: 'icon' })}
        </dds-link-with-icon>
      </dds-link-list-item>
      <dds-link-list-item>
        <dds-link-with-icon>
          Containerization A Complete Guide ${ArrowRight20({slot: 'icon'})}
        </dds-link-with-icon>
      </dds-link-list-item>
    </dds-link-list>
  `;
};

export default {
  title: 'Components/Link List',
  parameters: {
    // ...readme.parameters,
    knobs: {
      'dds-link-list/default': ({ groupId }) => ({
        children: textNullable('Link text (unnamed slot)', 'Link text', groupId),
        disabled: boolean('Disabled (disabled)', false, groupId),
        href: textNullable('Link href (href)', 'https://github.com/carbon-design-system/carbon-custom-elements', groupId),
        onClick: action('click'),
      }),
    },
  },
};
