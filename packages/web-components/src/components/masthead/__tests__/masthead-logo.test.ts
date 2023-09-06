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
import '../masthead-logo';

const template = (props?) => {
  const { href } = props ?? {};
  return html`
    <c4d-masthead-logo href="${ifDefined(href)}"></c4d-masthead-logo>
  `;
};

describe('c4d-masthead-logo', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-masthead-logo>`
      expect(document.body.querySelector('c4d-masthead-logo')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(template({ href: 'https://cloud.ibm.com/' }), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-masthead-logo>`
      expect(document.body.querySelector('c4d-masthead-logo')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
