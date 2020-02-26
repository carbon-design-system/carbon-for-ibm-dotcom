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
    const image = object('sources:', [
      { src: 'https://picsum.photos/id/2/320/160', breakpoint: 320 },
      { src: 'https://picsum.photos/id/2/400/400', breakpoint: 400 },
      { src: 'https://picsum.photos/id/2/672/672', breakpoint: 672 },
    ]);
    const alt = text('alt (required)', 'image alt text');
    const defaultSrc = text(
      'default image (required)',
      'https://picsum.photos/id/2/672/672'
    );

    return <Image sources={image} defaultSrc={defaultSrc} alt={alt}></Image>;
  });
