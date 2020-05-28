/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentItemHorizontal from '../ContentItemHorizontal';
import React from 'react';
import { shallow } from 'enzyme';

describe('ContentItemHorizontal', () => {
  it('renders as expected', () => {
    const eyebrow = 'Lorem ipsum';
    const heading = 'Aliquam condimentum';
    const copy = 'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit.';
    const cta = [
      {
        type: 'local',
        copy: 'Link text',
        href: 'https://example.com',
      },
      {
        type: 'external',
        copy: 'External link text',
        href: 'https://example.com',
      },
    ];

    const callout = shallow(
      <ContentItemHorizontal
        eyebrow={eyebrow}
        heading={heading}
        copy={copy}
        cta={cta}
      />
    );

    expect(callout.find('.bx--content-item-horizontal__item')).toHaveLength(1);
  });
});
