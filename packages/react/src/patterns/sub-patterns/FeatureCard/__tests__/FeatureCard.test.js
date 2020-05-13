import { ArrowRight20 } from '@carbon/icons-react';
import FeatureCard from '../FeatureCard';
import { mount } from 'enzyme';
import React from 'react';

describe('<FeatureCard />', () => {
  it('renders pattern with required heading', () => {
    const featureCard = mount(
      <FeatureCard
        card={{
          heading: 'lorem ipsum',
          image: {
            defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
            alt: 'Image alt text',
          },
          cta: {
            href: 'https://www.example.com',
            icon: {
              src: ArrowRight20,
            },
          },
        }}
      />
    );
    expect(featureCard.find('.bx--feature-card')).toHaveLength(1);
    expect(featureCard.find('.bx--feature-card__card')).toHaveLength(1);
  });
});
