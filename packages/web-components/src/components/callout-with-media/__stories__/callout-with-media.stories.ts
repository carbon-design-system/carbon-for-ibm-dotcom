/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../callout-with-media-image';
import '../callout-with-media-video';
import { html } from 'lit-element';
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import readme from './README.stories.mdx';

const image = html`
  <dds-callout-with-media-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
  </dds-callout-with-media-image>
`;

const video = html`
  <dds-callout-with-media-video
    video-id="0_uka1msg4"></dds-callout-with-media-video>
`;

export const Default = (args) => {
  const { copy, heading, mediaType } = args ?? {};

  const calloutHeading = document.querySelector('dds-content-block-heading');
  const calloutCopy = document.querySelector('dds-callout-with-media-copy');

  if (calloutHeading) {
    calloutHeading!.shadowRoot!.textContent = heading;
  }

  if (calloutCopy) {
    calloutCopy!.shadowRoot!.textContent = copy;
  }
  return html`
    <dds-callout-with-media>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-callout-with-media-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}"
        >${copy}</dds-callout-with-media-copy
      >
      ${mediaType === 'image' ? image : ``}
      ${mediaType === 'video' ? video : ``}
    </dds-callout-with-media>
  `;
};

export default {
  title: 'Components/Callout with media',
  component: 'dds-callout-with-media',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  argTypes: {
    mediaType: {
      control: { type: 'select' },
      options: ['image', 'video', 'none'],
      defaultValue: 'image',
    },
    heading: {
      control: 'text',
      defaultValue: 'Curabitur malesuada varius mi eu posuere',
    },
    copy: {
      control: 'text',
      defaultValue: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:`,
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        CalloutWithMedia: {
          mediaType: 'image',
          heading: 'Curabitur malesuada varius mi eu posuere',
          copy: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:`,
        },
      },
    },
  },
};
