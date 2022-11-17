/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { find } from '../../../globals/internal/collection-helpers';
import EventManager from '../../../../tests/utils/event-manager';
import DDSSearchWithTypeahead from '../search-with-typeahead';
// Above import is interface-only ref and thus code won't be brought into the build
import '../search-with-typeahead';
import '../search-with-typeahead-item';

const template = (props?) => {
  const {
    active,
    closeSearchButtonAssistiveText,
    language,
    open,
    openSearchButtonAssistiveText,
    performSearchButtonAssistiveText,
    searchPlaceholder,
    redirectUrl,
  } = props ?? {};
  return html`
    <dds-search-with-typeahead
      ?active="${active}"
      close-search-button-assistive-text="${ifNonNull(closeSearchButtonAssistiveText)}"
      language=${ifNonNull(language)}
      ?open="${open}"
      open-search-button-assistive-text="${ifNonNull(openSearchButtonAssistiveText)}"
      perform-search-button-assistive-text="${ifNonNull(performSearchButtonAssistiveText)}"
      searchPlaceholder="${ifNonNull(searchPlaceholder)}"
      redirect-url="${ifNonNull(redirectUrl)}"
    >
    </dds-search-with-typeahead>
  `;
};

describe('dds-search-with-typeahead', function() {
  const events = new EventManager();

  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-search-with-typeahead')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes in the inactive state', async function() {
      render(template({ openSearchButtonAssistiveText: 'open-search-button-assistive-text-foo' }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-search-with-typeahead')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          active: true,
          closeSearchButtonAssistiveText: 'close-search-button-assistive-text-foo',
          language: 'ko-KR',
          open: true,
          performSearchButtonAssistiveText: 'perform-search-button-assistive-text-foo',
          searchPlaceholder: 'placeholder-foo',
          redirectUrl: 'https://www.ibm.com/search',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-search-with-typeahead')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Activating/deactivating search box', function() {
    it('should activate the search box upon clicking on search button', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      (search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      expect(search.active).toBe(true);
      await Promise.resolve();
      // The `<input>` for the search box isn't rendered unless it's activated
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      spyOn(searchInputNode, 'focus');
      await Promise.resolve(); // `.updateComplete()` in `<dds-search-with-typeahead>` seems to take two rounds of micro-tasks
      expect(searchInputNode.focus).toHaveBeenCalled();
    });

    it('should deactivate the search box upon clicking on the close button', async function() {
      render(template({ active: true }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      const searchButtonNode = search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLButtonElement;
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-input-node-value-foo';
      spyOn(searchButtonNode, 'focus');
      (search.shadowRoot!.querySelector('.bx--header__search--close') as HTMLElement).click();
      expect(searchInputNode.value).toBe('');
      expect(search.active).toBe(false);
      await Promise.resolve();
      await Promise.resolve(); // `.updateComplete()` in `<dds-search-with-typeahead>` seems to take two rounds of micro-tasks
      expect(searchButtonNode.focus).toHaveBeenCalled();
    });
  });

  describe('Redirecting', function() {
    it('should redirect to the search result upon clickig on search button', async function() {
      render(template({ active: true, language: 'ko-KR', redirectUrl: 'https://www.ibm.com/search' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      spyOn(search as any, '_redirect');
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      (search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      expect((search as any)._redirect).toHaveBeenCalledWith('https://www.ibm.com/search?q=search-query-foo&lang=ko&cc=KR');
    });

    it('should redirect to the search result upon selecting a search result', async function() {
      render(template({ active: true, items: [{ highlighted: true, text: 'search-result-foo' }] }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      const input = search.shadowRoot!.querySelector('.bx--header__search--input');
      spyOn(search as any, '_redirect');
      (input as HTMLInputElement).value = 'test';
      input?.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
        })
      );
      await new Promise(r => setTimeout(r, 2500));
      (search.shadowRoot!.querySelector('dds-search-with-typeahead-item') as HTMLElement).click();
      expect((search as any)._redirect).toHaveBeenCalledWith('https://www.ibm.com/search?lnk=mhsrch&q=test&lang=en&cc=US');
    });

    it('should provide a way to prevent redirecting to the search result', async function() {
      render(template({ active: true }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      spyOn(search as any, '_redirect');
      let redirectUrlInEvent;
      events.on(search, 'dds-search-with-typeahead-beingredirected', event => {
        event.preventDefault();
        redirectUrlInEvent = event.detail.redirectUrl;
      });
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      (search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      expect(redirectUrlInEvent).toBe('https://www.ibm.com/search?lnk=mhsrch&q=search-query-foo&lang=en&cc=US');
      expect((search as any)._redirect).not.toHaveBeenCalled();
    });
  });

  describe('Form submission', function() {
    it('should let form submission work if there is no highlighted search result', async function() {
      render(template({ active: true, items: [{ text: 'search-result-foo' }] }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      const input = search.shadowRoot!.querySelector('.bx--header__search--input');
      (input as HTMLInputElement).value = 'test';
      input?.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
        })
      );
      spyOn(search as any, '_redirect');
      const event = new CustomEvent('submit', { bubbles: true, composed: true });
      spyOn(event, 'preventDefault');
      search!.shadowRoot!.querySelector('form')!.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should prevent selection of a search result from causing a form submission', async function() {
      render(template({ active: true }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      spyOn(search as any, '_redirect');
      const event = new CustomEvent('submit', { bubbles: true, composed: true });
      spyOn(event, 'preventDefault');
      search!.shadowRoot!.querySelector('form')!.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Highlighting search result item', function() {
    it('should highlight the matching query', async function() {
      render(template({ active: true }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-search-with-typeahead') as DDSSearchWithTypeahead;
      const input = search.shadowRoot!.querySelector('.bx--header__search--input');
      (input as HTMLInputElement).value = 'tes';
      input?.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
        })
      );
      await new Promise(r => setTimeout(r, 2500));
      const searchItem = search.shadowRoot!.querySelector('dds-search-with-typeahead-item');
      const highlightedContent = searchItem!.shadowRoot!.querySelector('.dds-ce--search-with-typeahead-item__highlighted');
      expect(highlightedContent!.textContent).toBe('tes');
      const textNode = find(
        searchItem!.shadowRoot!.querySelector('.bx--container-class')!.childNodes,
        ({ nodeType, nodeValue }) => nodeType === Node.TEXT_NODE && !/^\s*$/.test(nodeValue ?? '')
      );
      expect(textNode.nodeValue).toBe('t');
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    events.reset();
  });
});
