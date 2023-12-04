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
import '../locale-modal';
import '../regions';
import '../region-item';
import C4DLocaleSearch from '../locale-search';

const template = (props?) => {
  const { headerTitle, langDisplay, children } = props ?? {};
  return html`
    <c4d-locale-modal
      header-title="${ifDefined(headerTitle)}"
      lang-display="${ifDefined(langDisplay)}">
      ${children}
    </c4d-locale-modal>
  `;
};

describe('c4d-locale-modal', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const localeModal = document.body.querySelector('c4d-locale-modal');
      expect(localeModal).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          langDisplay: 'lang-display-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const localeModal = document.body.querySelector('c4d-locale-modal');
      expect(localeModal).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render locale selector', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          children: html`
            <c4d-regions>
              <c4d-region-item name="region-foo"></c4d-region-item>
            </c4d-regions>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('c4d-region-item') as HTMLElement).click();
      await Promise.resolve();
      const localeModal = document.body.querySelector('c4d-locale-modal');
      expect(localeModal).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Selecting region', function () {
    it('should update region in search UI', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          children: html`
            <c4d-regions>
              <c4d-region-item name="region-foo"></c4d-region-item>
            </c4d-regions>
            <c4d-locale-search></c4d-locale-search>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('c4d-region-item') as HTMLElement).click();
      await Promise.resolve();
      const localeSearch = document.body.querySelector('c4d-locale-search');
      expect((localeSearch as C4DLocaleSearch).region).toBe('region-foo');
    });

    it('should support going back to the region selector', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          children: html`
            <c4d-regions>
              <c4d-region-item name="region-foo"></c4d-region-item>
            </c4d-regions>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('c4d-region-item') as HTMLElement).click();
      await Promise.resolve();
      const localeModal = document.body.querySelector('c4d-locale-modal');
      (
        localeModal!.shadowRoot!.querySelector(
          'c4d-link-with-icon'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        localeModal!.shadowRoot!.querySelector('c4d-link-with-icon')
      ).toBeNull();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
