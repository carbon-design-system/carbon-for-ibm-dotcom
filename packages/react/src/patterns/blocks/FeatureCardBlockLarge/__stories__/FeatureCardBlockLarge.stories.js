/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import FeatureCardBlockLarge from '../FeatureCardBlockLarge';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Blocks)|FeatureCardBlockLarge', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const eyebrow = text(
      'Card eyebrow(required) (eyebrow):',
      'this is an eyebrow'
    );
    const heading = text(
      'Card heading(required) (heading):',
      'Explore AI use cases in all industries'
    );
    const copy = text(
      'Card copy: (copy)',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..'
    );
    const cardhref = text(
      'Card href(required) (cta.href):',
      'https://www.example.com'
    );
    const cta = {
      href: cardhref,
      icon: {
        src: ArrowRight20,
      },
    };
    const image = object('Card image(required) (image):', {
      defaultSrc: 'https://dummyimage.com/600x300/ee5396/161616&text=2:1',
      alt: 'Image alt text',
    });

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
            <FeatureCardBlockLarge
              eyebrow={eyebrow}
              heading={heading}
              copy={copy}
              cta={cta}
              image={image}
            />
          </div>
        </div>
      </div>
    );
  });
