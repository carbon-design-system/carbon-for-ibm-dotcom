/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import readme from './README.stories.mdx';
import styles from './callout-with-media.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../callout-with-media';
import '../callout-with-media-container';
import '../../content-block/content-block-heading';
import '../../image-with-caption/image-with-caption';
import '../../video-player/video-player-container';

const image = html`
<dds-image-with-caption
 slot="media"
 alt="Image alt text"
 default-src="https://dummyimage.com/672x378/ee5396/161616&text=16:9"
 heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
</dds-image-with-caption>
`;

const video = html`
<dds-video-player-container slot="media" video-id="0_uka1msg4"></dds-video-player-container>
`;

export const Default = ({ parameters }) => {
  const { mediaType, heading, copy } = parameters?.props.CalloutWithMedia ?? {};
  return  html`
  <dds-callout-with-media-container>
    <dds-callout-with-media copy=${copy}>
    <dds-content-block-heading slot="heading">${heading}</dds-content-block-heading>
      ${mediaType === 'image' ? image : ``}
      ${mediaType === 'video' ? video : ``}
    </dds-callout-with-media>
  </dds-callout-with-media-container>
  `;
};

export default {
  title: 'Components/Callout with Media',
  decorators: [
    story => html`
    <style>
        ${styles}
    </style>
    <div class="bx--grid" style="width: 100%">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            ${story()}
        </div>
      </div>
    </div>
    `,
  ],
    parameters: {
    ...readme.parameters,
    knobs: {
      CalloutWithMedia: ({ groupId }) => ({
        mediaType: select('mediaType (optional)', ['image', 'video', 'none'], 'image', groupId),
        heading: textNullable('Heading', 'Curabitur malesuada varius mi eu posuere', groupId),
        copy: textNullable(
          'Copy',
          `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:`,
          groupId
        ),
      }),
    },
  },
};
