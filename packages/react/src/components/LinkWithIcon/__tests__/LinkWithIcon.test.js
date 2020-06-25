/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LinkWithIcon from '../LinkWithIcon';
import React from 'react';
import { shallow } from 'enzyme';

describe('LinkWithIcon', () => {
  it('renders as expected', () => {
    const linkWithIcon = shallow(
      <LinkWithIcon href="https://www.example.com" inverse={true} />
    );

    expect(linkWithIcon.find('.bx--link-with-icon')).toHaveLength(1);
    expect(
      linkWithIcon.find('.bx--link-with-icon__container__inverse')
    ).toHaveLength(1);
  });
});
