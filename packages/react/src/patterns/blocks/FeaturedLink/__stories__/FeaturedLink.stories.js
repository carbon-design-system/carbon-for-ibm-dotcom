/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import { DDS_FEATURED_LINK } from '../../../../internal/FeatureFlags';
import FeaturedLink from '../FeaturedLink';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_FEATURED_LINK) {
  storiesOf('Patterns (Blocks)|Feature Card', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const heading = text(
        'Pattern heading(required):',
        'How is artificial intelligence used today in your industry?'
      );

      const cardheading = text(
        'Card Heading:',
        'Explore AI use cases in all industries'
      );
      const cardhref = text('Card href:', 'https://www.example.com');
      const images = object('card image', {
        defaultImage: 'https://picsum.photos/id/2/672/672',
        alt: 'featured link image',
      });

      return (
        <div className="bx--grid ">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
              <FeaturedLink
                heading={heading}
                card={{
                  heading: cardheading,
                  image: images,
                  cta: {
                    href: cardhref,
                    src: ArrowRight20,
                  },
                }}
              />
            </div>
          </div>
        </div>
      );
    });
}
