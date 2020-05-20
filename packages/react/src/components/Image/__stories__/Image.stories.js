/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text, withKnobs } from '@storybook/addon-knobs';
import Image from '../Image';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default {
  title: 'Components|Image',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const image = object('sources:', [
    {
      src: 'https://dummyimage.com/320x160/ee5396/161616&text=2x1',
      breakpoint: 320,
    },
    {
      src: 'https://dummyimage.com/400x400/ee5396/161616&text=1x1',
      breakpoint: 400,
    },
    {
      src: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
      breakpoint: 672,
    },
  ]);
  const alt = text('Image alt text (required)', 'Image alt text');
  const defaultSrc = text(
    'Default image (required)',
    'https://dummyimage.com/672x672/ee5396/161616&text=1x1'
  );

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
