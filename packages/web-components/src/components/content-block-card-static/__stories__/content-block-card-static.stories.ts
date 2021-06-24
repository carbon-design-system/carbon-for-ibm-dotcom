/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Chat20 from 'carbon-web-components/es/icons/chat/20.js';
// eslint-disable-next-line sort-imports
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

import { DDS_CONTENT_BLOCK_CARD_STATIC } from '../../../globals/internal/feature-flags';

const longHeadingCardGroupItem = html`
  <dds-card-group-item>
    <dds-card-heading>Nunc convallis lobortis Nunc convallis lobortis Nunc convallis lobortis</dds-card-heading>
    <dds-tag-group>
      <bx-tag>Most popular</bx-tag>
    </dds-tag-group>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
  </dds-card-group-item>
`;

const cardGroupItem = html`
  <dds-card-group-item cta-type="local">
    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
  </dds-card-group-item>
`;

export const Default = !DDS_CONTENT_BLOCK_CARD_STATIC
  ? undefined
  : ({ parameters }) => {
      const { heading, itemHeading, itemCopy, href } = parameters?.props?.ContentBlockCards ?? {};
      return html`
        <dds-content-block-card-static>
          <dds-content-block-heading>${heading}</dds-content-block-heading>
          <dds-card-group grid-mode="border">
            ${longHeadingCardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem} ${cardGroupItem}
          </dds-card-group>
          <dds-content-item>
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
          </dds-content-item>
          <dds-button-group slot="footer">
            <dds-button-group-item href="${href}">
              Contact us ${Chat20({ slot: 'icon' })}
            </dds-button-group-item>
            <dds-button-group-item href="${href}">
              Free trial ${ArrowRight20({ slot: 'icon' })}
            </dds-button-group-item>
          </dds-button-group>
        </dds-content-block-card-static>
      `;
    };

export default !DDS_CONTENT_BLOCK_CARD_STATIC
  ? undefined
  : {
      title: 'Components/Content block card static',
      decorators: [
        story => html`
          <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--card-group">
            ${story()}
          </div>
        `,
      ],
      parameters: {
        ...readme.parameters,
        hasGrid: true,
        knobs: {
          ContentBlockCards: () => ({
            heading: textNullable('Heading (heading):', 'Ways to buy'),
            ctaCopy: textNullable('Copy text (copy)', 'Lorem ipsum dolor sit ametttt'),
            href: textNullable('Href (href):', 'https://example.com'),
            itemHeading: textNullable('Item heading:', 'Lorem ipsum dolor si amett'),
            itemCopy: textNullable(
              'Item copy:',
              'Contact us for a customized quote, discounted pricing, and financing options ' +
                '- or get started with a free trial today'
            ),
          }),
        },
      },
    };
