/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../megamenu-top-nav-menu';
import C4DMegaMenuOverlay from '../megamenu-overlay';

const template = (props?) => {
  const { expanded } = props ?? {};
  return html`
    <c4d-megamenu-top-nav-menu
      ?expanded="${expanded}"></c4d-megamenu-top-nav-menu>
    <c4d-megamenu-overlay></c4d-megamenu-overlay>
  `;
};

xdescribe('c4d-megamenu-top-nav-menu', function () {
  describe('Toggling', function () {
    it('should hide the overlay if not expanded', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        (
          document.body.querySelector(
            'c4d-megamenu-overlay'
          ) as C4DMegaMenuOverlay
        ).active
      ).toBe(false);
    });

    xit('should show the overlay if expanded', async function () {
      render(template({ expanded: true }), document.body);
      await Promise.resolve();
      expect(
        (
          document.body.querySelector(
            'c4d-megamenu-overlay'
          ) as C4DMegaMenuOverlay
        ).active
      ).toBe(true);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
