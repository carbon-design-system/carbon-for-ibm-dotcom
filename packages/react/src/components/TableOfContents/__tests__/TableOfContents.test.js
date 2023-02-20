/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as smoothScroll from '@carbon/ibmdotcom-utilities/es/utilities/smoothScroll/smoothScroll';
import DataContent from '../__stories__/data/DataContent';
import { mount } from 'enzyme';
import React from 'react';
import TableOfContents from '../TableOfContents';
import TOCDesktop from '../TOCDesktop';
import TOCMobile from '../TOCMobile';

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
        <DataContent />
      </TableOfContents>
    );
    expect(toc.find('.bx--tableofcontents__desktop__item')).toHaveLength(
      menuItems.length
    );
    expect(
      toc.find('.bx--tableofcontents__desktop__item--active')
    ).toHaveLength(1);
    menuItems.forEach((item) => expect(toc.find(`[name='${item.id}']`)));
  });
});

describe('TOCMobile', () => {
  it('Handles onChange properly', () => {
    smoothScroll.default = jest.fn();
    const spyUpdate = jest.fn();
    const toc = mount(
      <TOCMobile
        menuItems={menuItems}
        selectedId={menuItems[0].id}
        menuLabel="Menu label"
        updateState={spyUpdate}
      />,
      { attachTo: window.domNode }
    );
    toc
      .find('select')
      .simulate('change', { target: { value: menuItems[1].id } });
    toc.find('select').props().onBlur();
    expect(spyUpdate).toHaveBeenCalledWith(menuItems[1].id, menuItems[1].title);
  });
});

describe('TOCDesktop', () => {
  it('Handles onClick properly', () => {
    document.body.innerHTML = `<div><a name="${menuItems[1].id}" /></div>`;
    smoothScroll.default = jest.fn();
    const toc = mount(
      <TOCDesktop menuItems={menuItems} selectedId={menuItems[0].id} />
    );
    toc
      .find(`a[href="#${menuItems[1].id}"]`)
      .simulate('click', { preventDefault: jest.fn() });
  });
});
