/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCardBlockLarge from '../FeatureCardBlockLarge';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|FeatureCardBlockLarge',

  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCardBlockLarge: ({ groupId }) => ({
        eyebrow: text(
          'Card eyebrow(required) (eyebrow):',
          'this is an eyebrow',
          groupId
        ),
        heading: text(
          'Card heading(required) (heading):',
          'Explore AI use cases in all industries',
          groupId
        ),
        copy: text(
          'Card copy: (copy)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..',
          groupId
        ),
        cta: {
          href: text(
            'Card href(required) (cta.href):',
            'https://www.example.com',
            groupId
          ),
          icon: {
            src: ArrowRight20,
          },
        },
        image: object(
          'Card image(required) (image):',
          {
            defaultSrc: 'https://dummyimage.com/600x300/ee5396/161616&text=2:1',
            alt: 'Image alt text',
          },
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, cta, image } =
    parameters?.props?.FeatureCardBlockLarge ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
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
};
