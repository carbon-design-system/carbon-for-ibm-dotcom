/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, object } from '@storybook/addon-knobs';
import Quote from '../Quote';
import React from 'react';
import readme from '../README.stories.mdx';

const types = {
  singleCurved: 'singleCurved',
  doubleCurved: 'doubleCurved',
  doubleAngle: 'doubleAngle',
  singleAngle: 'singleAngle',
  lowHighReversedDoubleCurved: 'lowHighReversedDoubleCurved',
};
export default {
  title: 'Components|Quote',

  parameters: {
    ...readme.parameters,
    knobs: {
      Quote: ({ groupId }) => ({
        copy: text(
          'Quote (copy): ',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
          groupId
        ),

        markType: select(
          'Quote Mark (markType):',
          types,
          types.doubleCurved,
          groupId
        ),

        source: {
          heading: text(
            'Quote Source Heading (source.heading): ',
            'Lorem ipsum dolor sit amet',
            groupId
          ),
          copy: text(
            'Quote Source Copy (source.copy): ',
            'consectetur adipiscing elit',
            groupId
          ),
          copy2: text(
            'Quote Source optional Copy (source.copy2)',
            'IBM Cloud',
            groupId
          ),
        },

        cta: object(
          'CTA Object:',
          {
            copy: 'Link with Icon',
            href: 'https://example.com',
          },
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { markType, copy, source, cta } = parameters?.props?.Quote ?? {};
  const inverse =
    ['g90', 'g100'].indexOf(
      document.documentElement.getAttribute('storybook-carbon-theme')
    ) >= 0;
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--offset-lg-4 bx--col-lg-12">
          <Quote
            markType={markType}
            copy={copy}
            source={source}
            cta={cta}
            inverse={inverse}
          />
        </div>
      </div>
    </div>
  );
};
