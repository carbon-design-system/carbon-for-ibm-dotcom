/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../left-nav-menu';

const template = (props?) => {
  const { backButtonText, expanded, title } = props ?? {};
  return html`
    <dds-left-nav-menu
      back-button-text="${ifNonNull(backButtonText)}"
      ?expanded="${expanded}"
      title="${ifNonNull(title)}">
    </dds-left-nav-menu>
  `;
};

describe('dds-left-nav-menu', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const leftNavMenu = document.body.querySelector('dds-left-nav-menu');
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
      const leftNavMenu = document.body.querySelector('dds-left-nav-menu');
      expect(leftNavMenu).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
