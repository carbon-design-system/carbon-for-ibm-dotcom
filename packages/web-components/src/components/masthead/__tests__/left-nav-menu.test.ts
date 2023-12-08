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
import '../left-nav-menu';

const template = (props?) => {
  const { backButtonText, expanded, title } = props ?? {};
  return html`
    <c4d-left-nav-menu
      back-button-text="${ifDefined(backButtonText)}"
      ?expanded="${expanded}"
      title="${ifDefined(title)}">
    </c4d-left-nav-menu>
  `;
};

describe('c4d-left-nav-menu', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const leftNavMenu = document.body.querySelector('c4d-left-nav-menu');
      expect(leftNavMenu).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          backButtonText: 'back-button-text-foo',
          expanded: true,
          title: 'title-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const leftNavMenu = document.body.querySelector('c4d-left-nav-menu');
      expect(leftNavMenu).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
