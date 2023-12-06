/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';

describe('c4d-cloud-masthead-composite', function () {
  describe('Rendering Cloud-specific global bar', function () {
    it('should not render cloud profile when unauthenticated', async function () {
      render(
        html`
          <c4d-cloud-masthead-composite
            user-status="anonymous"></c4d-cloud-masthead-composite>
        `,
        document.body
      );
      await Promise.resolve();
      const cloudMastheadComposite = document.body.querySelector(
        'c4d-cloud-masthead-composite'
      );
      expect(
        cloudMastheadComposite?.shadowRoot?.querySelector(
          'c4d-cloud-masthead-profile'
        )
      ).toBeNull();
    });

    it('should render cloud profile when authenticated', async function () {
      render(
        html`
          <c4d-cloud-masthead-composite
            user-status="authenticated"></c4d-cloud-masthead-composite>
        `,
        document.body
      );
      await Promise.resolve();
      const cloudMastheadComposite = document.body.querySelector(
        'c4d-cloud-masthead-composite'
      );
      expect(
        cloudMastheadComposite?.shadowRoot?.querySelector(
          'c4d-cloud-masthead-profile'
        )
      ).not.toBeNull();
    });
  });
});
