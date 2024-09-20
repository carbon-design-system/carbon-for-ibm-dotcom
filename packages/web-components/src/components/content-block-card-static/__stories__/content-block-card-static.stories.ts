/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import Chat20 from '@carbon/web-components/es/icons/chat/20.js';
// eslint-disable-next-line sort-imports
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const longHeadingCardGroupItem = html`
  <c4d-card-group-item>
    <c4d-card-heading
      >Nunc convallis lobortis Nunc convallis lobortis Nunc convallis
      lobortis</c4d-card-heading
    >
    <div>
      <cds-tag>Most popular</cds-tag>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin, sodales nulla quis, consequat libero.
    </p>
  </c4d-card-group-item>
`;

const cardGroupItem = html`
  <c4d-card-group-item cta-type="local">
    <c4d-card-heading>Nunc convallis lobortis</c4d-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin, sodales nulla quis, consequat libero.
    </p>
  </c4d-card-group-item>
`;

export const Default = (args) => {
  const { heading, itemHeading, itemCopy, href } =
    args?.ContentBlockCards ?? {};
  return html`
    <c4d-content-block-card-static>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      <c4d-card-group grid-mode="border">
        ${longHeadingCardGroupItem} ${cardGroupItem} ${cardGroupItem}
        ${cardGroupItem} ${cardGroupItem}
      </c4d-card-group>
      <c4d-content-item>
        <c4d-content-item-heading>${itemHeading}</c4d-content-item-heading>
        <c4d-content-item-copy>${itemCopy}</c4d-content-item-copy>
      </c4d-content-item>
      <c4d-button-group slot="footer">
        <c4d-button-group-item href="${href}">
          Contact us ${Chat20({ slot: 'icon' })}
        </c4d-button-group-item>
        <c4d-button-group-item href="${href}">
          Free trial ${ArrowRight20({ slot: 'icon' })}
        </c4d-button-group-item>
      </c4d-button-group>
    </c4d-content-block-card-static>
  `;
};

export default {
  title: '',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    percy: {
      skip: true,
    },
    knobs: {
      ContentBlockCards: () => ({
        heading: textNullable('Heading (heading):', 'Ways to buy'),
        ctaCopy: textNullable(
          'Copy text (copy)',
          'Lorem ipsum dolor sit ametttt'
        ),
        href: textNullable('Href (href):', 'https://example.com'),
        itemHeading: textNullable(
          'Item heading:',
          'Lorem ipsum dolor si amett'
        ),
        itemCopy: textNullable(
          'Item copy:',
          'Contact us for a customized quote, discounted pricing, and financing options ' +
            '- or get started with a free trial today'
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockCards: {
          heading: 'Ways to buy',
          ctaCopy: 'Lorem ipsum dolor sit ametttt',
          href: 'https://example.com',
          itemHeading: 'Lorem ipsum dolor si amett',
          itemCopy:
            'Contact us for a customized quote, discounted pricing, and financing options ' +
            '- or get started with a free trial today',
        },
      },
    },
  },
};
