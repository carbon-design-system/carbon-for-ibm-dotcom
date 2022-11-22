/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../footer-nav-item';

const template = (props?) => {
  const { titleText } = props ?? {};
  return html`
    <dds-footer-nav-item
      title-text="${ifNonNull(titleText)}"
    ></dds-footer-nav-item>
  `;
};

describe('dds-footer-nav-item', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-footer-nav-item>`
      expect(
        document.body.querySelector('dds-footer-nav-item')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(template({ titleText: 'title-text-foo' }), document.body);
      await Promise.resolve(); // Update cycle for `<dds-footer-nav-item>`
      expect(
        document.body.querySelector('dds-footer-nav-item')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
