/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import readme from './README.stories.mdx';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--005.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const cardGroupItems = (withImages) => {
  return html`
    <c4d-card-group-item href="https://example.com" cta-type="local">
      ${withImages
        ? html`
            <c4d-image
              slot="image"
              alt="Image alt text"
              default-src="${imgLg4x3}">
            </c4d-image>
          `
        : ''}
      <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
      <c4d-card-heading>Natural Language Processing.</c4d-card-heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <c4d-card-cta-footer slot="footer"></c4d-card-cta-footer>
    </c4d-card-group-item>
  `;
};

export const Default = (args) => {
  const { heading, withImages, withCTA } = args?.CardSectionSimple ?? {};
  const cards: object[] = [];
  for (let i = 0; i < 5; i++) {
    cards.push(cardGroupItems(withImages));
  }
  return html`
    <c4d-card-section-simple>
      <c4d-content-section-heading
        >${ifDefined(heading)}</c4d-content-section-heading
      >
      <c4d-card-group>
        ${cards}
        ${withCTA
          ? html`
              <c4d-card-group-item
                href="https://example.com"
                color-scheme="inverse"
                cta-type="local">
                <c4d-card-heading>Top level card link</c4d-card-heading>
                <c4d-card-cta-footer
                  slot="footer"
                  color-scheme="inverse"></c4d-card-cta-footer>
              </c4d-card-group-item>
            `
          : ``}
      </c4d-card-group>
    </c4d-card-section-simple>
  `;
};

export default {
  title: 'Components/Card section simple',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">${story()}</div>
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
