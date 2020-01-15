/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_FEATURED_LINK } from '../../../internal/FeatureFlags';
import FeaturedLink from '../FeaturedLink';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_FEATURED_LINK) {
  storiesOf('Featured Links', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'Pattern title(required):',
        'How is artificial intelligence used today in your industry?'
      );

      const cardtitle = text(
        'Card Title:',
        'Explore AI use cases in all industries'
      );
      const cardhref = text('Card href:', 'https://www.example.com');
      const images = object('card image', {
        defaultImage: 'https://picsum.photos/id/2/672/672',
        alt: 'featured link image',
      });

      return (
        <FeaturedLink
          title={title}
          card={{
            title: cardtitle,
            image: images,
            href: cardhref,
          }}
        />
      );
    });
}
