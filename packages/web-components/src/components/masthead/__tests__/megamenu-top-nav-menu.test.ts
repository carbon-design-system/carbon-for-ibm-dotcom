/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../megamenu-top-nav-menu';
import DDSMegaMenuOverlay from '../megamenu-overlay';

const template = (props?) => {
  const { expanded } = props ?? {};
  return html`
    <dds-megamenu-top-nav-menu ?expanded="${expanded}"></dds-megamenu-top-nav-menu>
    <dds-megamenu-overlay></dds-megamenu-overlay>
  `;
};

describe('dds-megamenu-top-nav-menu', function() {
  describe('Toggling', function() {
    it('should hide the overlay if not expanded', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect((document.body.querySelector('dds-megamenu-overlay') as DDSMegaMenuOverlay).active).toBe(false);
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
