/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, object } from '@storybook/addon-knobs';
import CalloutQuote from '../CalloutQuote';
import React from 'react';
import readme from '../README.stories.mdx';

const types = {
  singleCurved: 'singleCurved',
  doubleCurved: 'doubleCurved',
  doubleAngle: 'doubleAngle',
  singleAngle: 'singleAngle',
  lowHighReversedDoubleCurved: 'lowHighReversedDoubleCurved',
  cornerBracket: 'cornerBracket',
};

const props = () => ({
  quote: {
    copy: text(
      'Quote (copy): ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.'
    ),
    markType: select('Quote Mark (markType):', types, types.doubleCurved),
    source: {
      heading: text(
        'Quote Source Heading (source.heading): ',
        'Lorem ipsum dolor sit amet'
      ),
      copy: text(
        'Quote Source Copy (source.copy): ',
        'consectetur adipiscing elit'
      ),
      copy2: text('Quote Source Copy 2 (source.copy2)', 'IBM Cloud'),
    },
    cta: object('CTA Object:', {
      copy: 'Link with Icon',
      type: 'local',
      href: 'https://example.com',
    }),
  },
});

export default {
  title: 'Components/Callout quote',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Callout quote: Default',
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--offset-lg-4 bx--col-lg-12">
          <CalloutQuote {...props()} />
        </div>
      </div>
    </div>
  );
};
