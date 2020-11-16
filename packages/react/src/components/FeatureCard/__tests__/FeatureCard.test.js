/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCard from '../FeatureCard';
import React from 'react';
import { shallow } from 'enzyme';

describe('Callout', () => {
  it('renders as expected', () => {
    const featureCard = shallow(
      <FeatureCard
        card={{
          heading: 'lorem ipsum',
          image: {
            defaultSrc:
              'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
            alt: 'Image alt text',
          },
          cta: {
            href: 'https://example.com',
            icon: {
              src: ArrowRight20,
            },
          },
        }}
      />
    );
    expect(featureCard.find('.bx--feature-card')).toHaveLength(1);
  });
});
