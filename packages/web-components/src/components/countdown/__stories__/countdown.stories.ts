/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import ifNonEmpty from '@carbon/web-components/es/globals/directives/if-non-empty';
import { bxGrid16Col } from '../../../globals/internal/storybook-decorators';

import readme from './README.stories.mdx';

const msInDay = 86400000;
const twoWeeksFromNowTimestamp =
  Number(new Date().getTime().toString()) + 14 * msInDay;
const twoWeeksFromNowISO = new Date(twoWeeksFromNowTimestamp).toISOString();

export default {
  title: 'Components/Countdown',
  parameters: {
    ...readme.parameters,
  },
  argTypes: {
    targetDate: {
      control: { type: 'date' },
      name: 'Target Date',
      defaultValue: twoWeeksFromNowISO,
    },
    separator: {
      control: { type: 'text' },
      name: 'Separator',
      defaultValue: ', ',
    },
    labelType: {
      control: { type: 'select' },
      options: ['long', 'short', 'narrow', 'none'],
      name: 'Label Type',
      defaultValue: 'long',
    },
  },
  decorators: [(story) => bxGrid16Col(story)],
};

const Template = (args) => {
  const { targetDate, separator, labelType } = args;
  return html`
    <c4d-countdown
      target="${ifNonEmpty(targetDate)}"
      separator="${ifNonEmpty(separator)}"
      label-type="${ifNonEmpty(labelType)}"></c4d-countdown>
  `;
};

export const Default = (_args) => Template(_args);

export const WithTimestamp = (_args) => Template(_args);

WithTimestamp.argTypes = {
  targetDate: {
    control: { type: 'text' },
    name: 'Timestamp',
    defaultValue: `${twoWeeksFromNowTimestamp}`,
  },
};

export const InPromoBanner = (_args) => {
  return html`
    <c4d-promo-banner>
      <c4d-image
        alt="Image alt text"
        slot="image"
        width="300"
        height="300"
        default-src="https://fpoimg.com/300x300?&bg_color=5396ee&text_color=161616">
        <c4d-image-item
          media="(min-width:1584px)"
          srcset="https://fpoimg.com/600x600?&bg_color=ee5396&text_color=161616"></c4d-image-item>
        <c4d-image-item
          media="(min-width:1312px)"
          srcset="https://fpoimg.com/400x400?&bg_color=53ee96&text_color=161616"></c4d-image-item>
      </c4d-image>
      <h5>${Template(_args)}</h5>
      <p>Optional short body text</p>
      <c4d-button-cta
        cta-type="local"
        kind="tertiary"
        slot="cta"
        href="https://example.com"
        >Call To Action</c4d-button-cta
      >
    </c4d-promo-banner>
  `;
};
