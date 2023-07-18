/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCalloutWithMedia from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSCalloutWithMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-copy';
import DDSCalloutWithMediaImage from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-image';
import DDSCalloutWithMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-video';
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const image = (
  <DDSCalloutWithMediaImage
    alt="Image alt text"
    default-src={imgLg16x9}
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></DDSCalloutWithMediaImage>
);

const video = (
  <DDSCalloutWithMediaVideo video-id="1_9h94wo6b"></DDSCalloutWithMediaVideo>
);

export const Default = (args) => {
  const { copy, heading, mediaType } = args?.CalloutWithMedia ?? {};
  const headingComponent = document.querySelector('dds-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = heading;
  }

  return (
    <DDSCalloutWithMedia>
      <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
      <DDSCalloutWithMediaCopy size={CONTENT_BLOCK_COPY_SIZE.SMALL}>
        {copy}
      </DDSCalloutWithMediaCopy>
      {mediaType === 'image' ? image : ``} {mediaType === 'video' ? video : ``}
    </DDSCalloutWithMedia>
  );
};

export default {
  title: 'Components/Callout with media',
  decorators: [
    (story) => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-12 bx--no-gutter">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CalloutWithMedia: () => ({
        mediaType: select(
          'mediaType (optional)',
          ['image', 'video', 'none'],
          'image'
        ),
        heading: textNullable(
          'Heading',
          'Curabitur malesuada varius mi eu posuere'
        ),
        copy: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
          Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
          nulla quis, *consequat* libero. Here are
          some common categories:`,
      }),
    },
  },
};
