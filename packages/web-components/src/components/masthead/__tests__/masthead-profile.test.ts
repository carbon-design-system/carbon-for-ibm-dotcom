/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import User20 from '../../../internal/vendor/@carbon/web-components/icons/user/20.js';
import UserOnline20 from '../../../internal/vendor/@carbon/web-components/icons/user--online/20.js';
import DDSMastheadProfile from '../masthead-profile';

const template = (props?) => {
  const { authenticated, expanded, menuLabel } = props ?? {};
  return html`
    <dds-masthead-profile
      ?authenticated="${authenticated}"
      ?expanded="${expanded}"
      menu-label="${ifNonNull(menuLabel)}"></dds-masthead-profile>
  `;
};

describe('dds-masthead-profile', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-masthead-profile')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({ expanded: true, menuLabel: 'menu-label-foo' }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-masthead-profile')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Showing authenticated state', function () {
    it('should show the default icon in unauthenticated state', async function () {
      render(html` ${template()}${User20({ id: 'icon-ref' })} `, document.body);
      await Promise.resolve();
      const mastheadProfile = document.body.querySelector(
        'dds-masthead-profile'
      ) as DDSMastheadProfile;
      const icon = mastheadProfile.shadowRoot!.querySelector(
        '.bx--header__menu-title svg'
      );
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(
        iconRef!.querySelector('path')!.getAttribute('d')
      );
    });

    it('should show the "online" icon in authenticated state', async function () {
      render(
        html`
          ${template({ authenticated: true })}${UserOnline20({
            id: 'icon-ref',
          })}
        `,
        document.body
      );
      await Promise.resolve();
      const mastheadProfile = document.body.querySelector(
        'dds-masthead-profile'
      ) as DDSMastheadProfile;
      const icon = mastheadProfile.shadowRoot!.querySelector(
        '.bx--header__menu-title svg'
      );
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(
        iconRef!.querySelector('path')!.getAttribute('d')
      );
    });
  });

  describe('Toggling', function () {
    it('should toggle the menu by clicking on the trigger button', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadProfile = document.body.querySelector(
        'dds-masthead-profile'
      ) as DDSMastheadProfile;
      const trigger = mastheadProfile.shadowRoot!.querySelector(
        '.bx--header__menu-title'
      ) as HTMLElement;
      trigger.click();
      await Promise.resolve();
      expect(mastheadProfile.expanded).toBe(true);
      spyOn(trigger, 'focus');
      trigger.click();
      await Promise.resolve();
      expect(mastheadProfile.expanded).toBe(false);
      expect(trigger.focus).toHaveBeenCalled();
    });

    it('should close the menu by ESC key', async function () {
      render(template({ expanded: true }), document.body);
      await Promise.resolve();
      const mastheadProfile = document.body.querySelector(
        'dds-masthead-profile'
      ) as DDSMastheadProfile;
      const trigger = mastheadProfile.shadowRoot!.querySelector(
        '.bx--header__menu-title'
      ) as HTMLElement;
      spyOn(trigger, 'focus');
      const event = new CustomEvent('keydown', {
        bubbles: true,
        composed: true,
      });
      mastheadProfile.dispatchEvent(Object.assign(event, { key: 'Esc' }));
      expect(mastheadProfile.expanded).toBe(false);
      expect(trigger.focus).toHaveBeenCalled();
      (trigger.focus as jasmine.Spy<typeof trigger.focus>).calls.reset();
      mastheadProfile.expanded = true;
      await Promise.resolve();
      mastheadProfile.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      expect(mastheadProfile.expanded).toBe(false);
      expect(trigger.focus).toHaveBeenCalled();
    });

    it('should close the menu by blur', async function () {
      render(template({ expanded: true }), document.body);
      await Promise.resolve();
      const mastheadProfile = document.body.querySelector(
        'dds-masthead-profile'
      ) as DDSMastheadProfile;
      const trigger = mastheadProfile.shadowRoot!.querySelector(
        '.bx--header__menu-title'
      ) as HTMLElement;
      spyOn(trigger, 'focus');
      mastheadProfile.dispatchEvent(
        new CustomEvent('focusout', { bubbles: true })
      );
      expect(mastheadProfile.expanded).toBe(false);
      expect(trigger.focus).not.toHaveBeenCalled();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
