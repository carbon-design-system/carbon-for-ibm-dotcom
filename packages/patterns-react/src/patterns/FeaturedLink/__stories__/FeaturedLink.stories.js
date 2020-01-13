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

      const content = {
        title: text('Card1 Title:', 'Explore AI use cases in all industries'),
        link: {
          target: text('Card1 link target:', '_blank'),
          href: text('Card1 link href:', 'https://www.ibm.com'),
        },
      };

      const images = {
        mobile: 'https://picsum.photos/id/2/320/160',
        tablet: 'https://picsum.photos/id/2/400/400',
        default: 'https://picsum.photos/id/2/672/672',
        alt: 'featured link image',
      };

      return (
        <FeaturedLink
          title={title}
          content={content}
          image={object('image', images)}
        />
      );
    });
}
