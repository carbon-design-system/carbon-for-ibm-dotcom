/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Image from '../Image';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';
import { text } from '@storybook/addon-knobs';

const { prefix } = settings;

export default {
  title: 'Components|Image',

  parameters: {
    ...readme.parameters,
    knobs: {
      Image: ({ groupId }) => ({
        image: [
          {
            src:
              'https://fpoimg.com/320x160?text=2:1&bg_color=ee5396&text_color=161616',
            breakpoint: 'sm',
          },
          {
            src:
              'https://fpoimg.com/400x200?text=2:1&bg_color=ee5396&text_color=161616',
            breakpoint: 'md',
          },
          {
            src:
              'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616',
            breakpoint: 'lg',
          },
        ],
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        defaultSrc: text(
          'Default image (defaultSrc):',
          'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616',
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { image, alt, defaultSrc } = parameters?.props?.Image ?? {};

  return (
    <div className={`${prefix}--grid`}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <Image sources={image} defaultSrc={defaultSrc} alt={alt} />
        </div>
      </div>
    </div>
  );
};
