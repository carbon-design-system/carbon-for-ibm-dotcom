/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import ImageWithCaption from '../ImageWithCaption';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|ImageWithCaption',

  parameters: {
    ...readme.parameters,
    knobs: {
      ImageWithCaption: ({ groupId }) => ({
        heading: text('Heading (heading):', 'this is a caption', groupId),
        image: {
          sources: [
            {
              src: 'https://dummyimage.com/320x160/ee5396/161616&text=2x1',
              breakpoint: 'sm',
            },
            {
              src: 'https://dummyimage.com/400x200/ee5396/161616&text=2x1',
              breakpoint: 'md',
            },
            {
              src: 'https://dummyimage.com/672x336/ee5396/161616&text=2x1',
              breakpoint: 'lg',
            },
          ],
          alt: 'image with caption image',
          defaultSrc: 'https://dummyimage.com/672x336/ee5396/161616&text=2x1',
        },
        copy: text(
          'Copy (copy):',
          'This is a description of the image.',
          groupId
        ),
        lightbox: boolean('lightbox', true, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, image, copy, lightbox } =
    parameters?.props?.ImageWithCaption ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ImageWithCaption
            copy={copy}
            image={image}
            heading={heading}
            lightbox={lightbox}
          />
        </div>
      </div>
    </div>
  );
};
