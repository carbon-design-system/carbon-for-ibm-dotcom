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
import '../locale-modal';
import DDSLocaleModal from '../locale-modal';
import '../regions';
import '../region-item';

const template = (props?) => {
  const { headerTitle, langDisplay, children } = props ?? {};
  return html`
    <dds-locale-modal
      header-title="${ifNonNull(headerTitle)}"
      lang-display="${ifNonNull(langDisplay)}">
      ${children}
    </dds-locale-modal>
  `;
};

describe('dds-locale-modal', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const localeModal = document.body.querySelector('dds-locale-modal');
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
      const localeModal = document.body.querySelector('dds-locale-modal');
      expect(localeModal).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render locale selector', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          children: html`
            <dds-regions>
              <dds-region-item name="region-foo"></dds-region-item>
            </dds-regions>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('dds-region-item') as HTMLElement).click();
      await Promise.resolve();
      const localeModal = document.body.querySelector('dds-locale-modal');
      expect(localeModal).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Selecting region', function () {
    it('should reveal locale search after region selection', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          children: html`
            <dds-regions>
              <dds-region-item name="region-foo"></dds-region-item>
            </dds-regions>
            <dds-locale-search></dds-locale-search>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('dds-region-item') as HTMLElement).click();
      await Promise.resolve();
      const localeModal = document.body.querySelector(
        'dds-locale-modal'
      ) as DDSLocaleModal;
      const localeSearch = localeModal!.shadowRoot!.querySelector(
        'slot[name="locales-selector"]'
      );
      expect(localeSearch).not.toBeNull;
    });

    it('should support going back to the region selector', async function () {
      render(
        template({
          headerTitle: 'header-title-foo',
          children: html`
            <dds-regions>
              <dds-region-item name="region-foo"></dds-region-item>
            </dds-regions>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      (document.body.querySelector('dds-region-item') as HTMLElement).click();
      await Promise.resolve();
      const localeModal = document.body.querySelector('dds-locale-modal');
      (
        localeModal!.shadowRoot!.querySelector(
          'dds-link-with-icon'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        localeModal!.shadowRoot!.querySelector('dds-link-with-icon')
      ).toBeNull();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
