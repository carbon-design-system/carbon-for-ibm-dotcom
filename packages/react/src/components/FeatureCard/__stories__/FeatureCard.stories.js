/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text, withKnobs, boolean } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCard from '../FeatureCard';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|FeatureCard',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const cardheading = text(
    'Card Heading:',
    'Explore AI use cases in all industries'
  );
  const cardhref = text('Card href:', 'https://www.example.com');
  const image = object('card image', {
    defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
    alt: 'Image alt text',
  });

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <FeatureCard
            card={{
              heading: cardheading,
              image: image,
              cta: {
                href: cardhref,
                icon: {
                  src: ArrowRight20,
                },
              },
            }}
            inverse={boolean('Inverse theming(inverse):', false)}
          />
        </div>
      </div>
    </div>
  );
};
