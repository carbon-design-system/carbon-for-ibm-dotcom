/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  text,
  withKnobs,
  select,
  object,
  boolean,
} from '@storybook/addon-knobs';
import Quote from '../Quote';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|Quote', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const copy = text(
      'Quote (copy): ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.'
    );

    const types = {
      singleCurved: 'singleCurved',
      doubleCurved: 'doubleCurved',
      doubleAngle: 'doubleAngle',
      singleAngle: 'singleAngle',
      lowHighReversedDoubleCurved: 'lowHighReversedDoubleCurved',
    };
    const markType = select(
      'Quote Mark (markType):',
      types,
      types.doubleCurved
    );

    const source = {
      heading: text(
        'Quote Source Heading (source.heading): ',
        'Lorem ipsum dolor sit amet'
      ),
      copy: text(
        'Quote Source Copy (source.copy): ',
        'consectetur adipiscing elit'
      ),
    };

    const CTA = object('CTA Object:', {
      copy: 'Link with Icon',
      type: 'local',
      href: 'https://example.com',
    });

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--offset-lg-4 bx--col-lg-12">
            <Quote
              markType={markType}
              copy={copy}
              source={source}
              cta={CTA}
              inverse={boolean('Inverse theme: ', false)}
            />
          </div>
        </div>
      </div>
    );
  });
