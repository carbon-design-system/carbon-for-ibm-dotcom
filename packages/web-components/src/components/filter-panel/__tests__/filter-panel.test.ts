/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../filter-panel-composite';
import { Default } from '../__stories__/filter-panel.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-filter-panel-composite': props,
      },
    },
  });

describe('dds-filter-panel-composite', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-filter-panel>`
      expect(document.body.querySelector('dds-filter-panel-composite')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          heading: 'Filter',
          gridKnobs: '4 columns',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-filter-panel>`
      expect(document.body.querySelector('dds-filter-panel-composite')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
