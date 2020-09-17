/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import DDSLinkList from '../link-list';
import { Default, Horizontal, Vertical, VerticalWithCards, EndOfSection } from '../__stories__/link-list.stories';

describe('dds-link-list', function() {
  it('Renders Default', async function() {
    render(Default(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-link-list')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders Horizontal', async function() {
    render(Horizontal(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-link-list')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders Vertical', async function() {
    render(Vertical(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-link-list')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders Vertical with cards', async function() {
    render(VerticalWithCards(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-link-list')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Renders End of section', async function() {
    render(EndOfSection(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-link-list')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('Tests the get methods', function() {
    expect((DDSLinkList as typeof DDSLinkList).stableSelector).toBe('dds--link-list');
    expect((DDSLinkList as typeof DDSLinkList).splitLayoutClass).toBe('bx--link-list__split');
    expect((DDSLinkList as typeof DDSLinkList).linkListItemSelector).toBe('dds-link-list-item');
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
