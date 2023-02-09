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
import EventManager from '../../../../tests/utils/event-manager';
import DDSMastheadComposite from '../masthead-composite';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../__stories__/profile-items';

const template = (props?) => {
  const { language, userStatus, navLinks } = props ?? {};
  return html`
    <dds-masthead-composite
      language="${ifNonNull(language)}"
      user-status="${ifNonNull(userStatus)}"
      .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
      .navLinks="${navLinks}"
      .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}">
    </dds-masthead-composite>
  `;
};

describe('dds-masthead-composite', function () {
  const events = new EventManager();

  describe('Rendering global bar', function () {
    it('should render unauthenticated state', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'dds-masthead-composite'
      );
      expect(
        mastheadComposite!.querySelector('dds-masthead-global-bar')
      ).toMatchSnapshot();
    });

    it('should render authenticated state', async function () {
      render(template({ userStatus: 'test.user@ibm.com' }), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'dds-masthead-composite'
      );
      expect(
        mastheadComposite!.querySelector('dds-masthead-global-bar')
      ).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function () {
    it('should render nothing if there is no given/default nav items', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'dds-masthead-composite'
      );
      expect(mastheadComposite!.querySelector('dds-top-nav')).toBeNull();
    });
  });

  describe('Determining the nav/search language', function () {
    it('should use the given language', async function () {
      DDSMastheadComposite.prototype._setLanguage = jasmine.createSpy();
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(DDSMastheadComposite.prototype._setLanguage).toHaveBeenCalled();
    });

    afterEach(function () {
      DDSMastheadComposite.prototype._setLanguage = undefined;
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
