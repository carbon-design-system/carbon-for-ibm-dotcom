/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20 } from '@carbon/icons-react';
import Card from '../Card';
import React from 'react';
import { shallow } from 'enzyme';

const content = {
  title: 'Lorem ipsum dolor sit amet',
  href: 'https://example.com',
};

describe('<Card />', () => {
  it('renders as expected', () => {
    const card = shallow(<Card {...content} />);

    expect(card.hasClass('bx--card')).toBeTruthy();
    expect(card.find('.bx--card__title')).toHaveLength(1);
    expect(card.find('.bx--card__content')).toHaveLength(0);
    expect(card.find('.bx--card__footer')).toHaveLength(0);
  });

  it('returns null if no title provided', () => {
    const card = shallow(<Card href={content.href} />);
    expect(card.isEmptyRender()).toBeTruthy();
  });

  it("renders card's content if provided", () => {
    const card = shallow(<Card {...content} content="Hello world!" />);
    expect(card.find('.bx--card__content')).toHaveLength(1);
  });

  it("renders card's footer if icon is provided", () => {
    const card = shallow(<Card {...content} icon={ArrowRight20} />);
    expect(card.find('.bx--card__footer')).toHaveLength(1);
    expect(card.find(ArrowRight20)).toHaveLength(1);
  });
});
