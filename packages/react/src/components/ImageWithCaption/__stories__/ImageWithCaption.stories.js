/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import ImageWithCaption from '../ImageWithCaption';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|ImageWithCaption', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('heading (required)', 'this is a caption');

    const image = object('image', {
      sources: [
        {
          src: 'https://dummyimage.com/320x160/ee5396/fff&text=2x1',
          breakpoint: 'sm',
        },
        {
          src: 'https://dummyimage.com/400x200/ee5396/fff&text=2x1',
          breakpoint: 'md',
        },
      ],
      alt: 'image with caption image',
      defaultSrc: 'https://picsum.photos/id/2/672/672',
    });

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ImageWithCaption image={image} heading={heading} />
          </div>
        </div>
      </div>
    );
  });
