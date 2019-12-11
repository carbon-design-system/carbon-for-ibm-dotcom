/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import CardLink from '../CardLink';
import { ArrowRight20 } from '@carbon/icons-react';

const content = {
  title: 'Lorem ipsum dolor sit amet',
  href: 'https://example.com',
};

describe('<CardLink />', () => {
  it('renders as expected', () => {
    const cardLink = shallow(<CardLink {...content} />);

    expect(cardLink.hasClass('bx--card-link')).toBeTruthy();
    expect(cardLink.find('.bx--card-link__title')).toHaveLength(1);
    expect(cardLink.find('.bx--card-link__content')).toHaveLength(0);
    expect(cardLink.find('.bx--card-link__footer')).toHaveLength(0);
  });

  it('returns null if no title provided', () => {
    const cardLink = shallow(<CardLink href={content.href} />);
    expect(cardLink.isEmptyRender()).toBeTruthy();
  });

  it("renders cardlink's content if provided", () => {
    const cardLink = shallow(<CardLink {...content} content="Hello world!" />);
    expect(cardLink.find('.bx--card-link__content')).toHaveLength(1);
  });

  it("renders cardlink's footer if icon is provided", () => {
    const cardLink = shallow(<CardLink {...content} icon={<ArrowRight20 />} />);
    expect(cardLink.find('.bx--card-link__footer')).toHaveLength(1);
    expect(cardLink.find(ArrowRight20)).toHaveLength(1);
  });
});
