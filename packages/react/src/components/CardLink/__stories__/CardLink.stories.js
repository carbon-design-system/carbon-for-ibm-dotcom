/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import CardLink from '../CardLink';
import Error20 from '@carbon/icons-react/es/error/20';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|CardLink',
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
  const disabled = boolean('disabled', false);
  const iconStyle = disabled ? Error20 : ArrowRight20;

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <CardLink
            card={{
              copy: cardheading,
              cta: {
                href: cardhref,
                icon: {
                  src: iconStyle,
                },
              },
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
