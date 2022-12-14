/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';

describe('dds-cloud-masthead-composite', function () {
  describe('Rendering Cloud-specific global bar', function () {
    it('should not render cloud profile when unauthenticated', async function () {
      render(
        html`
          <dds-cloud-masthead-composite
            user-status="anonymous"></dds-cloud-masthead-composite>
        `,
        document.body
      );
      await Promise.resolve();
      const cloudMastheadComposite = document.body.querySelector(
        'dds-cloud-masthead-composite'
      );
      expect(
        cloudMastheadComposite!.querySelector('dds-cloud-masthead-profile')
      ).toBeNull();
    });

    it('should render cloud profile when authenticated', async function () {
      render(
        html`
          <dds-cloud-masthead-composite
            user-status="authenticated"></dds-cloud-masthead-composite>
        `,
        document.body
      );
      await Promise.resolve();
      const cloudMastheadComposite = document.body.querySelector(
        'dds-cloud-masthead-composite'
      );
      expect(
        cloudMastheadComposite!.querySelector('dds-cloud-masthead-profile')
      ).not.toBeNull();
    });
  });
});
