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
import C4DSearch from '../../search/search';
import C4DLocaleSearch from '../locale-search';
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
    <c4d-locale-search
      availability-label-text="${ifDefined(availabilityLabelText)}"
      close-button-assistive-text="${ifDefined(closeButtonAssistiveText)}"
      input-timeout="${ifDefined(inputTimeout)}"
      label-text="${ifDefined(labelText)}"
      placeholder="${ifDefined(placeholder)}"
      region="${ifDefined(region)}">
      ${children}
    </c4d-locale-search>
  `;
};

describe('c4d-locale-search', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const localeSearch = document.body.querySelector('c4d-locale-search');
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
      const localeSearch = document.body.querySelector('c4d-locale-search');
      expect(localeSearch).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Filtering items', function () {
    it('should filter items by region', async function () {
      render(
        template({
          region: 'region-bar',
          children: html`
            <c4d-locale-item region="region-foo"></c4d-locale-item>
            <c4d-locale-item region="region-bar"></c4d-locale-item>
            <c4d-locale-item region="region-baz"></c4d-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('c4d-locale-search');
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[region="region-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[region="region-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[region="region-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
    });

    xit('should filter items by country', async function () {
      // Let `input` event be handled synchronously
      spyOn(
        Object.getPrototypeOf(C4DLocaleSearch).prototype,
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
            <c4d-locale-item
              country="country-foo"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              country="country-bar"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              country="country-baz"
              region="region-foo"></c4d-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('c4d-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'c4d-search'
      ) as C4DSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('c4d-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'COUNTRY-B' },
        })
      );
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[country="country-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[country="country-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[country="country-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });

    xit('should filter items by language', async function () {
      // Let `input` event be handled synchronously
      spyOn(
        Object.getPrototypeOf(C4DLocaleSearch).prototype,
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
            <c4d-locale-item
              language="language-foo"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-bar"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-baz"
              region="region-foo"></c4d-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      const localeSearch = document.body.querySelector('c4d-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'c4d-search'
      ) as C4DSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('c4d-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'LANGUAGE-B' },
        })
      );
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(true);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });

    xit('should support clearing the filter', async function () {
      // Let `input` event be handled synchronously
      spyOn(
        Object.getPrototypeOf(C4DLocaleSearch).prototype,
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
            <c4d-locale-item
              language="language-foo"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-bar"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-baz"
              region="region-foo"></c4d-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<c4d-search>`
      const localeSearch = document.body.querySelector('c4d-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'c4d-search'
      ) as C4DSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('c4d-search-input', {
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
            'c4d-locale-item[language="language-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });
  });

  describe('Resetting the state', function () {
    xit('should reset the scroll position', async function () {
      render(
        template({
          region: 'region-foo',
          children: html`
            <c4d-locale-item
              language="language-foo"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-bar"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-baz"
              region="region-foo"></c4d-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<c4d-search>`
      const localeSearch = document.body.querySelector('c4d-locale-search');
      const spyScrollTop = spyOnProperty(
        localeSearch!.shadowRoot!.querySelector(
          '.cds--locale-modal__list'
        ) as HTMLElement,
        'scrollTop',
        'set'
      );
      (localeSearch as C4DLocaleSearch).reset();
      expect(spyScrollTop).toHaveBeenCalledWith(0);
    });

    xit('should clear the filter', async function () {
      render(
        template({
          region: 'region-foo',
          children: html`
            <c4d-locale-item
              language="language-foo"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-bar"
              region="region-foo"></c4d-locale-item>
            <c4d-locale-item
              language="language-baz"
              region="region-foo"></c4d-locale-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<c4d-search>`
      const localeSearch = document.body.querySelector('c4d-locale-search');
      const searchInputNode = localeSearch!.shadowRoot!.querySelector(
        'c4d-search'
      ) as C4DSearch;
      searchInputNode.dispatchEvent(
        new CustomEvent('c4d-search-input', {
          bubbles: true,
          composed: true,
          detail: { value: 'LANGUAGE-B' },
        })
      );
      searchInputNode!.value = 'LANGUAGE-B'; // The clear button handler checks if the value is empty to see if clearing is no-op
      (localeSearch as C4DLocaleSearch).reset();
      await Promise.resolve(); // The update cycle for `<cds-locale-search>`
      await Promise.resolve(); // The update cycle for `<c4d-search>`
      expect(searchInputNode!.value).toBe('');
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-foo"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-bar"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
      expect(
        (
          localeSearch!.querySelector(
            'c4d-locale-item[language="language-baz"]'
          ) as HTMLElement
        ).hidden
      ).toBe(false);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
