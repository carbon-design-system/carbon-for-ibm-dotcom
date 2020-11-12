/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../content-section/content-section';
import '../../card-group/card-group';
import '../../card-group/card-group-item';
import '../card-section-simple';

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <div slot="heading">Nunc convallis lobortis</div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
    </p>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

const cardGroupItemWithImages = html`
  <dds-card-group-item href="https://example.com">
    <dds-image slot="image" alt="Image alt text" default-src="https://dummyimage.com/1056x792/ee5396/161616&amp;text=4:3">
    </dds-image>
    <div slot="eyebrow">Topic</div>
    <div slot="heading">Natural Language Processing.</div>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionSimple ?? {};
  return html`
    <dds-card-section-simple heading=${ifNonNull(heading)}>
      <dds-card-group>${cards}</dds-card-group>
    </dds-card-section-simple>
  `;
};

export const WithCTA = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionSimple ?? {};
  return html`
    <dds-card-section-simple heading=${ifNonNull(heading)}>
      <dds-card-group>
        ${cards}
        <dds-card-group-item href="https://example.com" color-scheme="inverse">
          <div slot="heading">Top level card link</div>
          <dds-card-footer slot="footer" color-scheme="inverse">
            ${ArrowRight20({ slot: 'icon' })}
          </dds-card-footer>
        </dds-card-group-item>
      </dds-card-group>
    </dds-card-section-simple>
  `;
};

export const WithImages = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionSimple ?? {};
  return html`
    <dds-card-section-simple heading=${ifNonNull(heading)}>
      <dds-card-group>${cards}</dds-card-group>
    </dds-card-section-simple>
  `;
};

WithImages.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardSectionSimple: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Aliquam condimentum interdum', groupId),
        cards: Array.from({
          length: 5,
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};

export default {
  title: 'Components/Card Section Simple',
  decorators: [
    story => html`
      <div class="bx--grid bx--content-group-story dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridLargeColumnClass: 'bx--col-lg-8',
    knobs: {
      CardSectionSimple: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Aliquam condimentum interdum', groupId),
        cards: Array.from({
          length: 5,
        }).map(() => defaultCardGroupItem),
      }),
    },
  },
};
