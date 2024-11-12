/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, date, text } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { html } from 'lit';
import '../index';
import ifNonEmpty from '@carbon/web-components/es/globals/directives/if-non-empty.js';

import readme from './README.stories.mdx';

const msInDay = 86400000;
const twoWeeksFromNowTimestamp =
  Number(new Date().getTime().toString()) + 14 * msInDay;
const twoWeeksFromNowISO = new Date(twoWeeksFromNowTimestamp);

export default {
  title: 'Components/Countdown',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      Countdown: () => ({
        targetDate: date('Target Date', twoWeeksFromNowISO),
        separator: text('Separator', ', '),
        labelType: select(
          'Label Type',
          ['long', 'short', 'narrow', 'none'],
          'long'
        ),
      }),
    },
  },
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-16">${story()}</div>
        </div>
      </div>
    `,
  ],
};

const Template = (args) => {
  const { targetDate, separator, labelType } = args?.Countdown ?? {};

  return html`
    <c4d-countdown
      target="${ifNonEmpty(targetDate)}"
      separator="${ifNonEmpty(separator)}"
      label-type="${ifNonEmpty(labelType)}"></c4d-countdown>
  `;
};

export const Default = (args) => Template(args);

export const WithTimestamp = (args) => Template(args);

WithTimestamp.story = {
  parameters: {
    knobs: {
      Countdown: () => ({
        targetDate: textNullable(
          'Timestamp',
          twoWeeksFromNowTimestamp.toString()
        ),
        separator: text('Separator', ', '),
        labelType: select(
          'Label Type',
          ['long', 'short', 'narrow', 'none'],
          'long'
        ),
      }),
    },
  },
};

export const InPromoBanner = (args) => {
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
      <h5>${Template(args)}</h5>
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
