/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../index';
import readme from './README.stories.mdx';
import { grid8ColCentered } from '../../../globals/internal/storybook-decorators';
import { boolean, number, text } from '@storybook/addon-knobs';

export const Default = (args) => {
  const { disableTooltip, label, labelHref, rating, starCount, tooltipText } =
    args?.StarRating ?? {};
  return html`
    <c4d-star-rating
      ?disableTooltip="${disableTooltip}"
      label="${ifDefined(label || undefined)}"
      label-href="${ifDefined(labelHref || undefined)}"
      rating="${rating}"
      star-count="${starCount}"
      tooltip="${tooltipText}"></c4d-star-rating>
  `;
};

export const NoLabel = (args) => {
  const { disableTooltip, rating, starCount, tooltipText } = (args =
    args?.StarRating ?? {});

  return html`
    <c4d-star-rating
      ?disableTooltip="${disableTooltip}"
      rating="${rating}"
      star-count="${starCount}"
      tooltip="${tooltipText}"></c4d-star-rating>
  `;
};

export default {
  title: 'Components/Star Rating',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      StarRating: () => {
        const rating = number('Star Rating', 4.5);
        const label = text('Label text (optional)', '42 G2 reviews');
        const labelHref = text('Label link (optional)', '');
        const starCount = number('Max number of stars (optional)', 5);
        const tooltipText = text('Tooltip text (optional)', '');
        const disableTooltip = boolean('Disable tooltip (optional)', false);
        return {
          rating,
          label,
          labelHref,
          starCount,
          tooltipText,
          disableTooltip,
        };
      },
    },
  },
  decorators: [
    (story) => grid8ColCentered(story),
    (story) => html` <div style="margin-block-start: 2rem;">${story()}</div> `,
  ],
};
