/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--005.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const cardGroupItems = (withImages) => {
  return html`
    <dds-card-group-item href="https://example.com" cta-type="local">
      ${withImages
        ? html`
            <dds-image
              slot="image"
              alt="Image alt text"
              default-src="${imgLg4x3}">
            </dds-image>
          `
        : ''}
      <dds-card-eyebrow>Topic</dds-card-eyebrow>
      <dds-card-heading>Natural Language Processing.</dds-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <dds-card-cta-footer slot="footer"></dds-card-cta-footer>
    </dds-card-group-item>
  `;
};

export const Default = (args) => {
  const { heading, withImages, withCTA } = args?.CardSectionSimple ?? {};
  const cards: object[] = [];
  for (let i = 0; i < 5; i++) {
    cards.push(cardGroupItems(withImages));
  }
  return html`
    <dds-card-section-simple>
      <dds-content-section-heading
        >${ifNonNull(heading)}</dds-content-section-heading
      >
      <dds-card-group>
        ${cards}
        ${withCTA
          ? html`
              <dds-card-group-item
                href="https://example.com"
                color-scheme="inverse"
                cta-type="local">
                <dds-card-heading>Top level card link</dds-card-heading>
                <dds-card-cta-footer
                  slot="footer"
                  color-scheme="inverse"></dds-card-cta-footer>
              </dds-card-group-item>
            `
          : ``}
      </dds-card-group>
    </dds-card-section-simple>
  `;
};

export default {
  title: 'Components/Card section simple',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">${story()}</div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CardSectionSimple: () => ({
        heading: textNullable(
          'Heading (required):',
          'Aliquam condimentum interdum'
        ),
        withImages: boolean('With images:', false),
        withCTA: boolean('With CTA:', false),
      }),
    },
    propsSet: {
      default: {
        CardSectionSimple: {
          heading: 'Aliquam condimentum interdum',
          cards: [
            cardGroupItems,
            cardGroupItems,
            cardGroupItems,
            cardGroupItems,
            cardGroupItems,
          ],
        },
      },
    },
  },
};
