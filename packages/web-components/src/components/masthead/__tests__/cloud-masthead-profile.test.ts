/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import User20 from 'carbon-web-components/es/icons/user/20.js';
import UserOnline20 from 'carbon-web-components/es/icons/user--online/20.js';
import DDSCloudMastheadProfile from '../cloud/cloud-masthead-profile';

const template = (props?) => {
  const { authenticated, expanded, menuLabel } = props ?? {};
  return html`
    <dds-cloud-masthead-profile
      ?authenticated="${authenticated}"
      ?expanded="${expanded}"
      menu-label="${ifNonNull(menuLabel)}"
    ></dds-cloud-masthead-profile>
  `;
};

describe('dds-cloud-masthead-profile', function() {
  describe('Showing authenticated state', function() {
    it('should show the default icon in unauthenticated state', async function() {
      render(
        html`
          ${template()}${User20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve();
      const cloudMastheadProfile = document.body.querySelector('dds-cloud-masthead-profile') as DDSCloudMastheadProfile;
      const icon = cloudMastheadProfile.shadowRoot!.querySelector('.bx--header__menu-title svg');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });

    it('should show the "online" icon in authenticated state', async function() {
      render(
        html`
          ${template({ authenticated: true })}${UserOnline20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve();
      const cloudMastheadProfile = document.body.querySelector('dds-cloud-masthead-profile') as DDSCloudMastheadProfile;
      const icon = cloudMastheadProfile.shadowRoot!.querySelector('.bx--header__menu-title svg');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });
  });
});
