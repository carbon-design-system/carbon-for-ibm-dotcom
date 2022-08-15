/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import CalloutWithMedia from '../CalloutWithMedia';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const mediaDataByType = {
  image: {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: {
      sources: [
        {
          src: imgSm16x9,
          breakpoint: 320,
        },
        {
          src: imgMd16x9,
          breakpoint: 400,
        },
        {
          src: imgLg16x9,
          breakpoint: 672,
        },
      ],
      alt: 'Image alt text',
      defaultSrc: imgLg16x9,
    },
  },
  video: {
    videoId: '1_9h94wo6b',
    showCaption: true,
  },
};

const props = () => {
  const mediaType = select(
    'mediaType (optional)',
    ['image', 'video', 'none'],
    'image'
  );
  return {
    mediaData: mediaDataByType[mediaType],
    mediaType: mediaType === 'none' ? undefined : mediaType,
    heading: text('heading', 'Curabitur malesuada varius mi eu posuere'),
    copy: text(
      'copy',
      'Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.\n      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales\n      nulla quis, *consequat* libero. Here are\n      some common categories:'
    ),
  };
};

export default {
  title: 'Components/Callout with media',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Callout with media: Default',
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--offset-lg-4 bx--col-lg-12">
          <CalloutWithMedia {...props()} />
        </div>
      </div>
    </div>
  );
};
