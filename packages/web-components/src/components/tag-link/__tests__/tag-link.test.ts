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
import '../tag-link';

const template = (props?) => {
  const { copy, href } = props ?? {};
  return html`
    <c4d-tag-link href="${ifDefined(href)}"> ${copy} </c4d-tag-link>
  `;
};

describe('c4d-tag-link', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-tag-link>`
      expect(document.body.querySelector('c4d-tag-link')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          copy: 'copy-foo',
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-tag-link>`
      expect(document.body.querySelector('c4d-tag-link')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });
  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
