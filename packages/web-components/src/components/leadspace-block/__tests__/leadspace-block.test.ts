/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../leadspace-block';
import { Default } from '../__stories__/leadspace-block.stories';

const DefaultTemplate = (props?) =>
  Default({
    LeadSpaceBlock: props,
  });

describe('c4d-leadspace-block', function () {
  describe('Misc attributes - Default', function () {
    it('should render with minimum attributes', async function () {
      render(DefaultTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-leadspace-block>`
      expect(
        document.body.querySelector('c4d-leadspace-block')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        DefaultTemplate({
          title: 'leadspace-block title',
          heading: 'leadspace-block heading',
          copy: 'leadspace-block copy',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-leadspace-block>`
      expect(
        document.body.querySelector('c4d-leadspace-block')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
