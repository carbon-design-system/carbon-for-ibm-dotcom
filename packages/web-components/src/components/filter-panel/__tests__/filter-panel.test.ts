/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../filter-panel-composite';
import { Default } from '../__stories__/filter-panel.stories';

const template = (props?) =>
  Default({
    'c4d-filter-panel-composite': props,
  });

describe('c4d-filter-panel-composite', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-filter-panel>`
      expect(
        document.body.querySelector('c4d-filter-panel-composite')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    xit('should render with various attributes', async function () {
      render(
        template({
          heading: 'Filter',
          gridKnobs: '4 columns',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-filter-panel>`
      expect(
        document.body.querySelector('c4d-filter-panel-composite')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
