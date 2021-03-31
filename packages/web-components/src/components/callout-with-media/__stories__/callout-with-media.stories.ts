/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/no-duplicates
import '../../content-block/content-block-copy';
// Above import is interface-only ref and thus code won't be brought into the build
import '../../content-block/content-block-heading';
import '../callout-with-media';
import '../callout-with-media-image';
import '../callout-with-media-video';
import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports,import/no-duplicates
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import readme from './README.stories.mdx';
import styles from './callout-with-media.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';

const image = html`
  <dds-callout-with-media-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
  </dds-callout-with-media-image>
`;

const video = html`
  <dds-callout-with-media-video video-id="0_uka1msg4"></dds-callout-with-media-video>
`;

export const Default = ({ parameters }) => {
  const { copy, heading, mediaType } = parameters?.props?.CalloutWithMedia ?? {};
  return html`
    <dds-callout-with-media>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy size="${CONTENT_BLOCK_COPY_SIZE.SMALL}">${copy}</dds-content-block-copy>
      ${mediaType === 'image' ? image : ``} ${mediaType === 'video' ? video : ``}
    </dds-callout-with-media>
  `;
};

export default {
  title: 'Components/Callout with Media',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--callout',
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
      (story, { parameters }) => html`
        <style>
          ${styles}
        </style>
            <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
              ${story()}
            </div>
          </div>
        </div>
      `,
    ],
  },
};
