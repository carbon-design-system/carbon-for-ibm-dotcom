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
import DDSSearch from '../../search/search';
import DDSLocaleSearch from '../locale-search';
import '../locale-item';

const template = (props?) => {
  const {
    availabilityLabelText,
    closeButtonAssistiveText,
    inputTimeout,
    labelText,
    placeholder,
    region,
    children,
  } = props ?? {};
  return html`
    <dds-locale-search
      availability-label-text="${ifDefined(availabilityLabelText)}"
      close-button-assistive-text="${ifDefined(closeButtonAssistiveText)}"
      input-timeout="${ifDefined(inputTimeout)}"
      label-text="${ifDefined(labelText)}"
      placeholder="${ifDefined(placeholder)}"
      region="${ifDefined(region)}">
      ${children}
    </dds-locale-search>
  `;
};

describe('dds-locale-search', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      expect(localeSearch).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
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

  describe('Filtering items', function () {
    it('should filter items by region', async function () {
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
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[region="region-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[region="region-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[region="region-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
    });

    it('should filter items by country', async function () {
      // Let `input` event be handled synchronously
      spyOn(
        Object.getPrototypeOf(DDSLocaleSearch).prototype,
        '_invokeHandleThrottledInput'
      ).and.callFake(function (event) {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        this._handleThrottledInput(event);
      });
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item
              country="country-foo"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              country="country-bar"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              country="country-baz"
              region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'dds-search'
      ) as DDSSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('dds-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'COUNTRY-B' },
        })
      );
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[country="country-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[country="country-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[country="country-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });

    it('should filter items by language', async function () {
      // Let `input` event be handled synchronously
      spyOn(
        Object.getPrototypeOf(DDSLocaleSearch).prototype,
        '_invokeHandleThrottledInput'
      ).and.callFake(function (event) {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        this._handleThrottledInput(event);
      });
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item
              language="language-foo"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-bar"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-baz"
              region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('dds-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'dds-search'
      ) as DDSSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('dds-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'LANGUAGE-B' },
        })
      );
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });

    xit('should support clearing the filter', async function () {
      // Let `input` event be handled synchronously
      spyOn(
        Object.getPrototypeOf(DDSLocaleSearch).prototype,
        '_invokeHandleThrottledInput'
      ).and.callFake(function (event) {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        this._handleThrottledInput(event);
      });
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item
              language="language-foo"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-bar"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-baz"
              region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<dds-search>`
      const localeSearch = document.body.querySelector('dds-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'dds-search'
      ) as DDSSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('dds-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'LANGUAGE-B' },
        })
      );
      searchInputNode!.value = 'LANGUAGE-B'; // The clear button handler checks if the value is empty to see if clearing is no-op
      (
        searchInputNode!.shadowRoot!.querySelector(
          '.cds--search-close'
        ) as HTMLElement
      ).click();
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });
  });

  describe('Resetting the state', function () {
    it('should reset the scroll position', async function () {
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item
              language="language-foo"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-bar"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-baz"
              region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<dds-search>`
      const localeSearch = document.body.querySelector('dds-locale-search');
      const spyScrollTop = spyOnProperty(
        localeSearch!.shadowRoot!.querySelector(
          '.cds--locale-modal__list'
        ) as HTMLElement,
        'scrollTop',
        'set'
      );
      (localeSearch as DDSLocaleSearch).reset();
      expect(spyScrollTop).toHaveBeenCalledWith(0);
    });

    it('should clear the filter', async function () {
      render(
        template({
          region: 'region-foo',
          children: html`
            <dds-locale-item
              language="language-foo"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-bar"
              region="region-foo"></dds-locale-item>
            <dds-locale-item
              language="language-baz"
              region="region-foo"></dds-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<dds-search>`
      const localeSearch = document.body.querySelector('dds-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'dds-search'
      ) as DDSSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('dds-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'LANGUAGE-B' },
        })
      );
      searchInputNode!.value = 'LANGUAGE-B'; // The clear button handler checks if the value is empty to see if clearing is no-op
      (localeSearch as DDSLocaleSearch).reset();
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<dds-search>`
      expect(searchInputNode!.value).toBe('');
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'dds-locale-item[language="language-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
