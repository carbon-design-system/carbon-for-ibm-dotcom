/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Error20 from 'carbon-web-components/es/icons/error/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import styles from './card-link.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../card-link';

export const Default = ({ parameters }) => {
  const { disabled, href } = parameters?.props?.CardLink ?? {};
  return html`
    <dds-card-link ?disabled=${disabled} href=${ifNonNull(href || undefined)}>
      <p>Explore AI use cases in all industries</p>
      <dds-card-footer ?disabled=${disabled}>
        ${disabled ? Error20({ slot: 'icon' }) : ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card-link>
  `;
};

export default {
  title: 'Components/Card Link',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid bx--grid--condensed" style="width: 100%">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-4 bx--col-lg-3 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      CardLink: ({ groupId }) => ({
        disabled: boolean('Disabled (disabled):', false, groupId),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
      }),
    },
  },
};
