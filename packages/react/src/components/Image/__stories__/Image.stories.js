/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import Image from '../Image';
import img320 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--001.jpg';
import img480 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--001.jpg';
import img960 from '../../../../../storybook-images/assets/960/fpo--2x1--960x480--001.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const props = () => ({
  sources: [
    {
      src: img320,
      breakpoint: 'sm',
    },
    {
      src: img480,
      breakpoint: 'md',
    },
    {
      src: img960,
      breakpoint: 'lg',
    },
  ],
  alt: text('Image alt text (alt):', 'Image alt text'),
  defaultSrc: text('Default image (defaultSrc):', img960),
  border: boolean('Image border (border):', false),
});

export default {
  title: 'Components/Image',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Image: Default',
    },
  },
};

export const Default = () => {
  return (
    <div className={`${prefix}--grid`}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <Image {...props()} />
        </div>
      </div>
    </div>
  );
};
