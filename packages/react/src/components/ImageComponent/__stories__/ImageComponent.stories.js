/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import ImageComponent from '../ImageComponent';
import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('ImageComponent', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const defaultImages = text(
      'Default image:',
      'https://picsum.photos/id/2/672/672'
    );
    const imageObject = object('Images Object:', [
      'https://picsum.photos/id/2/320/160',
      'https://picsum.photos/id/2/400/400',
      'https://picsum.photos/id/2/672/672',
    ]);
    const alt = text('alt', 'lead space image');

    return (
      <ImageComponent
        defaultImage={defaultImages}
        images={imageObject}
        alt={alt}></ImageComponent>
    );
  });
