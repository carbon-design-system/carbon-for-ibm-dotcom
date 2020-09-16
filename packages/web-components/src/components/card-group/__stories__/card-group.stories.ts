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
import { number } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import styles from './card-group.stories.scss';
import '../card-group';
import '../card-group-item';

export const Default = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>${cards}</dds-card-group>
  `;
};

export const withCTA = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>
      ${cards}
      <dds-card-group-item href="https://example.com" color-scheme="inverse">
        <div slot="heading">Top level card link</div>
        <dds-card-footer slot="footer" color-scheme="inverse">
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-footer>
      </dds-card-group-item>
    </dds-card-group>
  `;
};

export const withImages = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>${cards}</dds-card-group>
  `;
};

export const withImagesAndCTA = ({ parameters }) => {
  const { cards } = parameters?.props?.CardGroup ?? {};
  return html`
    <dds-card-group>
      ${cards}
      <dds-card-group-item href="https://example.com" color-scheme="inverse">
        <div slot="heading">Top level card link</div>
        <dds-card-footer slot="footer" color-scheme="inverse">
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-footer>
      </dds-card-group-item>
    </dds-card-group>
  `;
};

export const defaultCardGroupItem = () => {
  return html`
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
};

const cardGroupItemWithImages = html`
  <dds-card-group-item href="https://example.com">
    <dds-image slot="image" alt="Image alt text" default-src="https://dummyimage.com/1056x792/ee5396/161616&text=4:3">
    </dds-image>
    <div slot="eyebrow">Topic</div>
    <div slot="heading">Natural Language Processing.</div>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

export default {
  title: 'Components/Card Group',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid bx--content-group-story">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => defaultCardGroupItem()),
      }),
    },
  },
};

withImages.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};

withImagesAndCTA.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      CardGroup: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 5, {}, groupId),
        }).map(() => cardGroupItemWithImages),
      }),
    },
  },
};
