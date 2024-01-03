/* eslint-disable max-len */
/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCalloutWithMedia from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DCalloutWithMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-copy';
import C4DCalloutWithMediaImage from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-image';
import C4DCalloutWithMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-video';
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import { COLOR_SCHEME } from '../../../component-mixins/callout/defs';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const colorSchemeTypes = {
  [`${COLOR_SCHEME.REGULAR}`]: COLOR_SCHEME.REGULAR,
  [`${COLOR_SCHEME.INVERSE}`]: COLOR_SCHEME.INVERSE,
  [`${COLOR_SCHEME.LAYER}`]: COLOR_SCHEME.LAYER,
  [`${COLOR_SCHEME.PURPLE}`]: COLOR_SCHEME.PURPLE,
  [`${COLOR_SCHEME.CYAN}`]: COLOR_SCHEME.CYAN,
};

const image = (
  <C4DCalloutWithMediaImage
    alt="Image alt text"
    default-src={imgLg16x9}
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></C4DCalloutWithMediaImage>
);

const video = (
  <C4DCalloutWithMediaVideo video-id="1_9h94wo6b"></C4DCalloutWithMediaVideo>
);

export const Default = (args) => {
  const { copy, heading, mediaType, colorScheme } =
    args?.CalloutWithMedia ?? {};
  const headingComponent = document.querySelector('c4d-content-block-heading');

  if (headingComponent) {
    headingComponent.shadowRoot!.textContent = heading;
  }

  return (
    <C4DCalloutWithMedia color-scheme={colorScheme}>
      <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
      <C4DCalloutWithMediaCopy size={CONTENT_BLOCK_COPY_SIZE.SMALL}>
        {copy}
      </C4DCalloutWithMediaCopy>
      {mediaType === 'image' ? image : ``} {mediaType === 'video' ? video : ``}
    </C4DCalloutWithMedia>
  );
};

export default {
  title: 'Components/Callout with media',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-lg-12 cds--no-gutter">{story()}</div>
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
        colorScheme: select(
          'Color scheme:',
          colorSchemeTypes,
          COLOR_SCHEME.REGULAR
        ),
      }),
    },
  },
};
