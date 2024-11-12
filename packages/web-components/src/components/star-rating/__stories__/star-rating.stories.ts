import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import '../index';
import readme from './README.stories.mdx';
import { bxGrid8ColCentered } from '../../../globals/internal/storybook-decorators';

export const Default = ({
  disableTooltip,
  label,
  labelHref,
  rating,
  starCount,
  tooltipText,
}) => html`
  <c4d-star-rating
    ?disableTooltip="${disableTooltip}"
    label="${ifDefined(label || undefined)}"
    label-href="${ifDefined(labelHref || undefined)}"
    rating="${rating}"
    star-count="${starCount}"
    tooltip="${tooltipText}"></c4d-star-rating>
`;

export const NoLabel = ({
  disableTooltip,
  rating,
  starCount,
  tooltipText,
}) => html`
  <c4d-star-rating
    ?disableTooltip="${disableTooltip}"
    rating="${rating}"
    star-count="${starCount}"
    tooltip="${tooltipText}"></c4d-star-rating>
`;

NoLabel.argTypes = {
  label: {
    table: { disable: true },
  },
  labelHref: {
    table: { disable: true },
  },
};

export default {
  title: 'Components/Star Rating',
  argTypes: {
    rating: {
      name: 'Star rating',
      control: { type: 'number' },
      defaultValue: 4.5,
    },
    label: {
      name: 'Label (optional)',
      control: { type: 'text' },
      defaultValue: '42 G2 reviews',
    },
    labelHref: {
      name: 'Label link (optional)',
      control: { type: 'text' },
      defaultValue: '',
    },
    starCount: {
      name: 'Max number of stars (optional)',
      control: { type: 'number' },
      defaultValue: 5,
    },
    tooltipText: {
      name: 'Tooltip text (optional)',
      control: { type: 'text' },
      defaultValue: '',
    },
    disableTooltip: {
      name: 'Disable tooltip (optional)',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  parameters: {
    ...readme.parameters,
  },
  decorators: [
    (story) => bxGrid8ColCentered(story),
    (story) => html` <div style="margin-block-start: 2rem;">${story()}</div> `,
  ],
};
