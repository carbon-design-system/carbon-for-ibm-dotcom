/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit';
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/defs';
import { COLOR_SCHEME } from '../../../component-mixins/callout/defs';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import storyDocs from './callout-with-media.mdx';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';

type Story = StoryObj;

const colorSchemeTypes = [
  COLOR_SCHEME.REGULAR,
  COLOR_SCHEME.INVERSE,
  COLOR_SCHEME.LAYER,
  COLOR_SCHEME.PURPLE,
  COLOR_SCHEME.CYAN,
];

const image = html`
  <c4d-callout-with-media-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
  </c4d-callout-with-media-image>
`;

const video = html`
  <c4d-callout-with-media-video
    video-id="1_9h94wo6b"></c4d-callout-with-media-video>
`;

const args: Args = {
  mediaType: 'image',
  heading: 'Curabitur malesuada varius mi eu posuere',
  copy: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:`,
  colorScheme: COLOR_SCHEME.REGULAR,
};

const argTypes: ArgTypes = {
  mediaType: {
    control: 'select',
    description: 'mediaType (optional)',
    options: ['image', 'video', 'none'],
  },
  heading: {
    control: 'text',
    description: 'Heading',
  },
  colorScheme: {
    control: 'select',
    description: 'Color scheme',
    options: colorSchemeTypes,
  },
};

export const Default: Story = {
  args,
  argTypes,
  render: ({ copy, heading, mediaType, colorScheme }) => {
    return html`
      <c4d-callout-with-media color-scheme="${colorScheme}">
        <c4d-content-block-heading>${heading}</c4d-content-block-heading>
        <c4d-callout-with-media-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}"
          >${copy}</c4d-callout-with-media-copy
        >
        ${mediaType === 'image' ? image : ``}
        ${mediaType === 'video' ? video : ``}
      </c4d-callout-with-media>
    `;
  },
};

const meta: Meta = {
  title: 'Components/Callout with media',
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
    percy: {
      skip: true,
    },
    docs: {
      page: storyDocs,
    },
    hasStoryPadding: true,
  },
};

export default meta;
