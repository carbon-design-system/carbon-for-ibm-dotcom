/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentItem from '../ContentItem';
import React from 'react';
import { shallow } from 'enzyme';

const content = {
  heading: 'this is a heading',
  image: {
    images: [
      {
        src: 'https://dummyimage.com/288x144/ee5396/fff&text=2x1',
        minWidth: 'sm',
      },
      {
        src: 'https://dummyimage.com/448x224/ee5396/fff&text=2x1',
        minWidth: 'md',
      },
      {
        src: 'https://dummyimage.com/352x176/ee5396/fff&text=2x1',
        minWidth: 'lg',
      },
    ],
    defaultImage: 'https://dummyimage.com/352x176/ee5396/fff&text=2x1',
    alt: 'Image alt text',
  },
  copy: 'this is the copy',
  cta: {
    copy: 'Lorem ipsum dolor sit amet',
    type: 'local',
    href: 'https://example.com',
  },
};

describe('<ContentItem />', () => {
  it('renders as expected with all elements', () => {
    const contentItem = shallow(<ContentItem {...content} />);

    expect(contentItem.hasClass('bx--content-item')).toBeTruthy();
    expect(contentItem.find('.bx--content-item__heading')).toHaveLength(1);
    expect(contentItem.find('.bx--content__image')).toHaveLength(1);
    expect(contentItem.find('.bx--content__copy')).toHaveLength(1);
    expect(contentItem.find('.bx--content__cta')).toHaveLength(1);
  });
});
