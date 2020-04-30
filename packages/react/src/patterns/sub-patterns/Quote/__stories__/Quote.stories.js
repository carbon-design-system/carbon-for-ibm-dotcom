import './index.scss';

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
      'Quote(Required): ',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.'
    );

    const types = {
      singleCurved: 'singleCurved',
      doubleCurved: 'doubleCurved',
      doubleAngle: 'doubleAngle',
      singleAngle: 'singleAngle',
      lowHighReversedDoubleCurved: 'lowHighReversedDoubleCurved',
    };
    const markType = select('Quote Mark:', types, types.doubleCurved);

    const source = {
      heading: text('Quote Source Heading: ', 'Lorem ipsum dolor sit amet'),
      copy: text('Quote Source Copy: ', 'consectetur adipiscing elit'),
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
