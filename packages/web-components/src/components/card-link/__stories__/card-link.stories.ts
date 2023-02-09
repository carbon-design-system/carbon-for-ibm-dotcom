/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import Error20 from '../../../internal/vendor/@carbon/web-components/icons/error/20.js';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

export const Default = (args) => {
  const { disabled, href, heading, copy } = args?.CardLink ?? {};
  return html`
    <dds-card-link ?disabled=${disabled} href=${ifNonNull(href || undefined)}>
      <dds-card-link-heading>${heading}</dds-card-link-heading>
      ${copy ? html` <p>${copy}</p> ` : ``}
      <dds-card-footer ?disabled=${disabled}>
        ${disabled ? Error20({ slot: 'icon' }) : ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card-link>
  `;
};

export default {
  title: 'Components/Card link',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
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
      CardLink: () => ({
        disabled: boolean('Disabled (disabled):', false),
        href: textNullable('Card href (href):', 'https://example.com'),
        heading: textNullable(
          'Card heading (heading):',
          'Explore AI use cases in all industries'
        ),
        copy: textNullable('Card copy (copy):', ''),
      }),
    },
    propsSet: {
      default: {
        CardLink: {
          disabled: false,
          href: 'https://example.com',
          heading: 'Explore AI use cases in all industries',
          copy: '',
        },
      },
    },
  },
};
