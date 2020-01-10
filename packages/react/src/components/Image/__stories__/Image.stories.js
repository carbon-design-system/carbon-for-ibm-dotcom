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
import { storiesOf } from '@storybook/react';

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    // const defaultImages = text(
    //   'Default image:',
    //   'https://picsum.photos/id/2/672/672'
    // );
    const imageObject = object('Images Object:', [
      { src: 'https://picsum.photos/id/2/320/160', minWidth: 320 },
      { src: 'https://picsum.photos/id/2/400/400', minWidth: 400 },
      { src: 'https://picsum.photos/id/2/672/672', minWidth: 672 },
    ]);
    const alt = text('alt', 'lead space image');
    const defaultImage = text(
      'default image:',
      'https://picsum.photos/id/2/672/672'
    );

    return (
      <Image images={imageObject} defaultImage={defaultImage} alt={alt}></Image>
    );
  });
