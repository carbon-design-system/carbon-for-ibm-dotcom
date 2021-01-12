/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import CalloutWithMedia from '../CalloutWithMedia';
import img320_16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import img480_16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import img720_16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const mediaDataByType = {
  image: {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: {
      sources: [
        {
          src: img320_16x9,
          breakpoint: 320,
        },
        {
          src: img480_16x9,
          breakpoint: 400,
        },
        {
          src: img720_16x9,
          breakpoint: 672,
        },
      ],
      alt: 'Image alt text',
      defaultSrc: img720_16x9,
    },
  },
  video: {
    videoId: '1_9h94wo6b',
    showCaption: true,
  },
};

export default {
  title: 'Components|CalloutWithMedia',

  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    knobs: {
      CalloutWithMedia: ({ groupId }) => {
        const mediaType = select(
          'mediaType (optional)',
          ['image', 'video', 'none'],
          'image',
          groupId
        );
        return {
          mediaData: mediaDataByType[mediaType],
          mediaType: mediaType === 'none' ? undefined : mediaType,
          heading: text(
            'heading',
            'Curabitur malesuada varius mi eu posuere',
            groupId
          ),
          copy: text(
            'copy',
            'Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.\n      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales\n      nulla quis, *consequat* libero. Here are\n      some common categories:',
            groupId
          ),
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { mediaData, mediaType, heading, copy } =
    parameters?.props?.CalloutWithMedia ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--offset-lg-4 bx--col-lg-12">
          <CalloutWithMedia
            mediaData={mediaData}
            mediaType={mediaType}
            heading={heading}
            copy={copy}
          />
        </div>
      </div>
    </div>
  );
};
