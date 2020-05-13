/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CalloutQuote from '../CalloutQuote';
import React from 'react';
import { shallow } from 'enzyme';

describe('CalloutQuote', () => {
  it('renders as expected', () => {
    const quote = {
      copy: 'Lorem ipsum dolor',
      cta: {
        copy: 'Link with Icon',
        type: 'local',
        href: 'https://example.com',
      },
      source: {
        heading: 'lorem ipsum',
        copy: 'dolor sit amet',
      },
    };

    const callout = shallow(<CalloutQuote quote={quote} />);

    expect(callout.find('.bx--callout-quote')).toHaveLength(1);
  });
});
