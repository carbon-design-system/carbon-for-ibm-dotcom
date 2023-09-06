/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import Error20 from '../../../internal/vendor/@carbon/web-components/icons/error/20.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

export const Default = (args) => {
  const { disabled, href, heading, copy } = args?.CardLink ?? {};
  return html`
    <c4d-card-link ?disabled=${disabled} href=${ifDefined(href || undefined)}>
      <c4d-card-link-heading>${heading}</c4d-card-link-heading>
      ${copy ? html` <p>${copy}</p> ` : ``}
      <c4d-card-footer ?disabled=${disabled}>
        ${disabled ? Error20({ slot: 'icon' }) : ArrowRight20({ slot: 'icon' })}
      </c4d-card-footer>
    </c4d-card-link>
  `;
};

export default {
  title: 'Components/Card link',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div
            class="cds--col-sm-4 cds--col-md-3 cds--col-lg-6 cds--col-xlg-4 cds--no-gutter">
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
