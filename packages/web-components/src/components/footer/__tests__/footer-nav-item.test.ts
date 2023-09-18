/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../footer-nav-item';

const template = (props?) => {
  const { titleText } = props ?? {};
  return html`
    <c4d-footer-nav-item
      title-text="${ifDefined(titleText)}"></c4d-footer-nav-item>
  `;
};

describe('c4d-footer-nav-item', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-footer-nav-item>`
      expect(
        document.body.querySelector('c4d-footer-nav-item')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(template({ titleText: 'title-text-foo' }), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-footer-nav-item>`
      expect(
        document.body.querySelector('c4d-footer-nav-item')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
