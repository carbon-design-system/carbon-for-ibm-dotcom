/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import BXSearch from 'carbon-web-components/es/components/search/search';
import DDSLocaleSearch from '../locale-search';
import '../locale-item';

const template = (props?) => {
  const { availabilityLabelText, closeButtonAssistiveText, inputTimeout, labelText, placeholder, region, children } = props ?? {};
  return html`
    <dds-locale-search
      availability-label-text="${ifNonNull(availabilityLabelText)}"
      close-button-assistive-text="${ifNonNull(closeButtonAssistiveText)}"
      input-timeout="${ifNonNull(inputTimeout)}"
      label-text="${ifNonNull(labelText)}"
      placeholder="${ifNonNull(placeholder)}"
      region="${ifNonNull(region)}"
    >
      ${children}
    </dds-locale-search>
  `;
};

describe('dds-locale-search', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      expect(localeSearch).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          availabilityLabelText: 'availability-label-text-foo',
          closeButtonAssistiveText: 'close-button-assistive-text-foo',
          inputTimeout: 500,
          labelText: 'label-text-foo',
          placeholder: 'placeholder-foo',
          region: 'region-foo',
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      expect(localeSearch).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Filtering items', function() {
    it('should filter items by region', async function() {
      render(
        template({
          region: 'region-bar',
          children: html`
            <dds-locale-item region="region-foo"></dds-locale-item>
            <dds-locale-item region="region-bar"></dds-locale-item>
            <dds-locale-item region="region-baz"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      expect((localeSearch!.querySelector('dds-locale-item[region="region-foo"]') as HTMLElement).hidden).toBe(true);
      expect((localeSearch!.querySelector('dds-locale-item[region="region-bar"]') as HTMLElement).hidden).toBe(false);
      expect((localeSearch!.querySelector('dds-locale-item[region="region-baz"]') as HTMLElement).hidden).toBe(true);
    });

    it('should filter items by country', async function() {
      // Let `input` event be handled synchronously
      spyOn(Object.getPrototypeOf(DDSLocaleSearch).prototype, '_invokeHandleThrottledInput').and.callFake(function(event) {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        this._handleThrottledInput(event);
      });
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item country="country-foo" region="region-foo"></dds-locale-item>
            <dds-locale-item country="country-bar" region="region-foo"></dds-locale-item>
            <dds-locale-item country="country-baz" region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector('bx-search') as BXSearch;
      searchInputNode.value = 'COUNTRY-B'; // Test case insensitive, partial search
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      expect((localeSearch!.querySelector('dds-locale-item[country="country-foo"]') as HTMLElement).hidden).toBe(true);
      expect((localeSearch!.querySelector('dds-locale-item[country="country-bar"]') as HTMLElement).hidden).toBe(false);
      expect((localeSearch!.querySelector('dds-locale-item[country="country-baz"]') as HTMLElement).hidden).toBe(false);
    });

    it('should filter items by language', async function() {
      // Let `input` event be handled synchronously
      spyOn(Object.getPrototypeOf(DDSLocaleSearch).prototype, '_invokeHandleThrottledInput').and.callFake(function(event) {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        this._handleThrottledInput(event);
      });
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item language="language-foo" region="region-foo"></dds-locale-item>
            <dds-locale-item language="language-bar" region="region-foo"></dds-locale-item>
            <dds-locale-item language="language-baz" region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector('bx-search') as BXSearch;
      searchInputNode.value = 'LANGUAGE-B'; // Test case insensitive, partial search
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      expect((localeSearch!.querySelector('dds-locale-item[language="language-foo"]') as HTMLElement).hidden).toBe(true);
      expect((localeSearch!.querySelector('dds-locale-item[language="language-bar"]') as HTMLElement).hidden).toBe(false);
      expect((localeSearch!.querySelector('dds-locale-item[language="language-baz"]') as HTMLElement).hidden).toBe(false);
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
