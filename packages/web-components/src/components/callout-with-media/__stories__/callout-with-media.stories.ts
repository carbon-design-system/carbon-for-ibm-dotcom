/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import styles from './callout-with-media.stories.scss';
import '../callout-with-media';
import '../callout-with-media-image';
import '../../content-block-simple/content-block-simple__media-video';
import '../../image-with-caption/image-with-caption'
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

const image = html`
<dds-callout-with-media-image
 alt="Image alt text"
 default-src="https://dummyimage.com/672x378/ee5396/161616&text=16:9"
 heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
</dds-callout-with-media-image>
`;

const video = html`
<dds-content-block-simple__media-video video-id="0_uka1msg4"></dds-content-block-simple__media-video>
`;

export const Default = ({ parameters }) => {
  const { copy, heading, mediaType } = parameters?.props?.CalloutWithMedia ?? {};
  return html`
    <dds-callout-with-media copy=${copy}>
      <dds-content-block-heading slot="heading">${heading}</dds-content-block-heading>
      ${mediaType === 'image' ? image : ``}
      ${mediaType === 'video' ? video : ``}
    </dds-callout-with-media>
  `;
};

export default {
  title: 'Components/Callout with Media',
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
    decorators: [
      story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-9 bx--offset-lg-2">
              ${story()}
            </div>
          </div>
        </div>
      `,
    ],
  },
};
