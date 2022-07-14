/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import ImageWithCaption from '../ImageWithCaption';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--004.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--004.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--004.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const props = () => ({
  heading: text('Heading (heading):', 'This is a caption'),
  image: {
    sources: [
      {
        src: imgSm2x1,
        breakpoint: 'sm',
      },
      {
        src: imgMd2x1,
        breakpoint: 'md',
      },
      {
        src: imgLg2x1,
        breakpoint: 'lg',
      },
    ],
    alt: 'image with caption image',
    defaultSrc: imgLg2x1,
  },
  copy: text('Copy (copy):', 'This is a description of the image.'),
  lightbox: boolean('lightbox', true),
});

export default {
  title: 'Components/Image with caption',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ImageWithCaption {...props()} />
        </div>
      </div>
    </div>
  );
};
