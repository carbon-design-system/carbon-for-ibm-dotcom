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
import '../../content-block/content-block-heading';

// TODO: Replace with <dds-image-with-caption>
const image = html`
  <dds-image slot="media" alt="Image alt text" default-src="https://dummyimage.com/672x378/ee5396/161616&text=16:9">
    <dds-image-item media="(min-width: 672px)" srcset="https://dummyimage.com/672x378/ee5396/161616&text=16:9"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="https://dummyimage.com/400x225/ee5396/161616&text=16:9"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="https://dummyimage.com/320x180/ee5396/161616&text=16:9"> </dds-image-item>
  </dds-image>
`;

const video = html`
  <dds-video-player-container slot="media" video-id="0_uka1msg4"></dds-video-player-container>
`;

export const Default = ({ parameters }) => {
  const { mediaType, heading, copy } = parameters?.props?.CalloutWithMedia ?? {};
  return html`
    <dds-callout-with-media copy="${copy}">
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${mediaType === 'image' ? image : ``} ${mediaType === 'video' ? video : ``}
    </dds-callout-with-media>
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
          <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
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
