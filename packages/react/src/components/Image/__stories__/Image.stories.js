/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import Image from '../Image';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Image', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const imageObject = object('Images Object:', [
      {
        src: 'https://dummyimage.com/320x160/ee5396/161616&text=2:1',
        minWidth: 'sm',
      },
      {
        src: 'https://dummyimage.com/400x400/ee5396/161616&text=1:1',
        minWidth: 'md',
      },
      {
        src: 'https://dummyimage.com/672x672/ee5396/161616&text=1:1',
        minWidth: 'lg',
      },
    ]);
    const defaultImage = text(
      'default image:',
      'https://dummyimage.com/672x672/ee5396/161616&text=1:1'
    );
    const alt = text('alt', 'Image alt text');

    return (
      <Image images={imageObject} defaultImage={defaultImage} alt={alt}></Image>
    );
  });
