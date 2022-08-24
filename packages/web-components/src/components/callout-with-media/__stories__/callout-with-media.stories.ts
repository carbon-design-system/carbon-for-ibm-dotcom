/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/no-duplicates
import '../index';
import '../callout-with-media-image';
import '../callout-with-media-video';
import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports,import/no-duplicates
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
// import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const image = html`
  <dds-callout-with-media-image
    alt="Image alt text"
    default-src="https://dummyimage.com/600x400/000/fff"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
  </dds-callout-with-media-image>
`;

const video = html`
  <dds-callout-with-media-video video-id="0_uka1msg4"></dds-callout-with-media-video>
`;

export const Default = args => {
  const { copy, heading, mediaType } = args?.CalloutWithMedia ?? {};
  return html`
    <dds-callout-with-media>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-callout-with-media-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}">${copy}</dds-callout-with-media-copy>
      ${mediaType === 'image' ? image : ``} ${mediaType === 'video' ? video : ``}
    </dds-callout-with-media>
  `;
};

export default {
  title: 'Components/Callout with media',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CalloutWithMedia: () => ({
        mediaType: select('mediaType (optional)', ['image', 'video', 'none'], 'image'),
        heading: textNullable('Heading', 'Curabitur malesuada varius mi eu posuere'),
        copy: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:`,
      }),
    },
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
