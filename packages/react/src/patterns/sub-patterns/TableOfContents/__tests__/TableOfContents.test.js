/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dataContent from '../__stories__/data/dataContent';
import { mount } from 'enzyme';
import React from 'react';
import TableOfContents from '../TableOfContents';

const menuItems = [
  {
    title: 'Cras molestie condimentum',
    id: '8',
  },
  {
    title: 'Praesent fermentum sodales',
    id: '7',
  },
  {
    title: 'Nulla tristique lacinia',
    id: '2',
  },
  {
    title: 'Morbi id nibh metus',
    id: '3',
  },
  {
    title: 'Integer non scelerisque',
    id: '14',
  },
];

describe('TableOfContents', () => {
  it('renders as expected', () => {
    const toc = mount(
      <TableOfContents
        menuItems={menuItems}
        menuRule={true}
        menuLabel="Menu label">
        {dataContent}
      </TableOfContents>
    );
    expect(toc.find('.bx--tableofcontents__desktop__item')).toHaveLength(
      menuItems.length
    );
    expect(
      toc.find('.bx--tableofcontents__desktop__item--active')
    ).toHaveLength(1);
    menuItems.forEach(item => expect(toc.find(`[name='${item.id}']`)));
  });
});
