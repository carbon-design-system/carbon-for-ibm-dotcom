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
import EventManager from '../../../../tests/utils/event-manager';
import C4DMastheadComposite from '../masthead-composite';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../__stories__/profile-items';

const template = (props?) => {
  const { language, userStatus, navLinks } = props ?? {};
  return html`
    <c4d-masthead-composite
      language="${ifDefined(language)}"
      user-status="${ifDefined(userStatus)}"
      .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
      .navLinks="${navLinks}"
      .unauthenticatedProfileItems="${ifDefined(unauthenticatedProfileItems)}">
    </c4d-masthead-composite>
  `;
};

describe('cds-masthead-composite', function () {
  const events = new EventManager();

  describe('Rendering global bar', function () {
    it('should render unauthenticated state', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'c4d-masthead-composite'
      );
      expect(
        mastheadComposite?.querySelector('c4d-masthead-global-bar')
      ).toMatchSnapshot();
    });

    it('should render authenticated state', async function () {
      render(template({ userStatus: 'test.user@ibm.com' }), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'c4d-masthead-composite'
      );
      expect(
        mastheadComposite?.querySelector('c4d-masthead-global-bar')
      ).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function () {
    it('should render nothing if there is no given/default nav items', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'c4d-masthead-composite'
      );
      expect(mastheadComposite!.querySelector('cds-top-nav')).toBeNull();
    });
  });

  describe('Determining the nav/search language', function () {
    it('should use the given language', async function () {
      C4DMastheadComposite.prototype._setLanguage = jasmine.createSpy();
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(C4DMastheadComposite.prototype._setLanguage).toHaveBeenCalled();
    });

    afterEach(function () {
      C4DMastheadComposite.prototype._setLanguage = undefined;
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
