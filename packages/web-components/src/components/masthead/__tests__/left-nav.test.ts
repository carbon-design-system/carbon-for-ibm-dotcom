/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import { SIDE_NAV_USAGE_MODE } from 'carbon-custom-elements/es/components/ui-shell/side-nav';
import '../left-nav';
import DDSLeftNavOverlay from '../left-nav-overlay';

const template = (props?) => {
  const { expanded, usageMode } = props ?? {};
  return html`
    <dds-left-nav ?expanded="${expanded}" usage-mode="${ifNonNull(usageMode)}"></dds-left-nav>
    <dds-left-nav-overlay></dds-left-nav-overlay>
  `;
};

describe('dds-left-nav', function() {
  describe('Toggling', function() {
    it('should hide the overlay if not expanded', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect((document.body.querySelector('dds-left-nav-overlay') as DDSLeftNavOverlay).active).toBe(false);
    });

    it('should show the overlay if not expanded', async function() {
      render(template({ expanded: true }), document.body);
      await Promise.resolve();
      expect((document.body.querySelector('dds-left-nav-overlay') as DDSLeftNavOverlay).active).toBe(true);
    });

    it('should warn wrong usage mode', async function() {
      render(template({ usageMode: SIDE_NAV_USAGE_MODE.REGULAR }), document.body);
      spyOn(console, 'warn');
      await Promise.resolve();
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledWith(
        'dds-left-nav supports only `header-nav` for its `usage-mode` attribute or `usageMode` property. The value is ignored:',
        SIDE_NAV_USAGE_MODE.REGULAR
      );
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
