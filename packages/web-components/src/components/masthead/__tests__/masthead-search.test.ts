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
import { find } from '../../../globals/internal/collection-helpers';
import EventManager from '../../../../tests/utils/event-manager';
import DDSMastheadSearch from '../masthead-search';
import '../masthead-search-item';

const template = (props?) => {
  const {
    active,
    closeSearchButtonAssistiveText,
    language,
    open,
    openSearchButtonAssistiveText,
    performSearchButtonAssistiveText,
    placeholder,
    redirectUrl,
    items = [],
  } = props ?? {};
  return html`
    <dds-masthead-search
      ?active="${active}"
      close-search-button-assistive-text="${ifNonNull(closeSearchButtonAssistiveText)}"
      language=${ifNonNull(language)}
      ?open="${open}"
      open-search-button-assistive-text="${ifNonNull(openSearchButtonAssistiveText)}"
      perform-search-button-assistive-text="${ifNonNull(performSearchButtonAssistiveText)}"
      placeholder="${ifNonNull(placeholder)}"
      redirect-url="${ifNonNull(redirectUrl)}"
    >
      ${items.map(
        ({ highlighted, text }) => html`
          <dds-masthead-search-item ?highlighted="${highlighted}" text="${ifNonNull(text)}"></dds-masthead-search-item>
        `
      )}
    </dds-masthead-search>
  `;
};

describe('dds-masthead-search', function() {
  const events = new EventManager();

  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-search')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes in the inactive state', async function() {
      render(template({ openSearchButtonAssistiveText: 'open-search-button-assistive-text-foo' }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-search')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          active: true,
          closeSearchButtonAssistiveText: 'close-search-button-assistive-text-foo',
          language: 'ko-KR',
          open: true,
          performSearchButtonAssistiveText: 'perform-search-button-assistive-text-foo',
          placeholder: 'placeholder-foo',
          redirectUrl: 'https://www.ibm.com/search',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-search')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Activating/deactivating search box', function() {
    it('should activate the search box upon clicking on search button', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      (search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      expect(search.active).toBe(true);
      await Promise.resolve();
      // The `<input>` for the search box isn't rendered unless it's activated
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      spyOn(searchInputNode, 'focus');
      await Promise.resolve(); // `.updateComplete()` in `<dds-masthead-search>` seems to take two rounds of micro-tasks somehow
      expect(searchInputNode.focus).toHaveBeenCalled();
    });

    it('should deactivate the search box upon clicking on the close button', async function() {
      render(template({ active: true }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      const searchButtonNode = search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLButtonElement;
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-input-node-value-foo';
      spyOn(searchButtonNode, 'focus');
      (search.shadowRoot!.querySelector('.bx--header__search--close') as HTMLElement).click();
      expect(searchInputNode.value).toBe('');
      expect(search.active).toBe(false);
      await Promise.resolve();
      await Promise.resolve(); // `.updateComplete()` in `<dds-masthead-search>` seems to take two rounds of micro-tasks somehow
      expect(searchButtonNode.focus).toHaveBeenCalled();
    });
  });

  describe('Redirecting', function() {
    it('should redirect to the search result upon clickig on search button', async function() {
      render(template({ active: true, language: 'ko-KR', redirectUrl: 'https://www.ibm.com/search' }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      spyOn(search as any, '_redirect');
      const searchInputNode = search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      (search.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      expect((search as any)._redirect).toHaveBeenCalledWith('https://www.ibm.com/search?q=search-query-foo&lang=ko&cc=KR');
    });

    it('should redirect to the search result upon selecting a search result', async function() {
      render(template({ active: true, items: [{ highlighted: true, text: 'search-result-foo' }] }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      spyOn(search as any, '_redirect');
      (document.body.querySelector('dds-masthead-search-item') as HTMLElement).click();
      expect((search as any)._redirect).toHaveBeenCalledWith(
        'https://www.ibm.com/search?lnk=mhsrch&q=search-result-foo&lang=en&cc=US'
      );
    });

    it('should provide a way to prevent redirecting to the search result', async function() {
      render(template({ active: true }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      spyOn(search as any, '_redirect');
      let redirectUrlInEvent;
      events.on(search, 'dds-masthead-search-beingredirected', event => {
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
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      spyOn(search as any, '_redirect');
      const event = new CustomEvent('submit', { bubbles: true, composed: true });
      spyOn(event, 'preventDefault');
      search!.shadowRoot!.querySelector('form')!.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should prevent selection of a search result from causing a form submission', async function() {
      render(template({ active: true, items: [{ highlighted: true, text: 'search-result-foo' }] }), document.body);
      await Promise.resolve();
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
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
      const search = document.body.querySelector('dds-masthead-search') as DDSMastheadSearch;
      (search.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement).value = 'search query foo';
      render(template({ active: true, items: [{ text: 'search query foo bar' }] }), document.body);
      await Promise.resolve();
      const searchItem = document.body.querySelector('dds-masthead-search-item');
      const highlightedContent = searchItem!.shadowRoot!.querySelector('.dds-ce--masthead-search-item__highlighted');
      expect(highlightedContent!.textContent).toBe('search query foo');
      const textNode = find(
        searchItem!.shadowRoot!.querySelector('.bx--container-class')!.childNodes,
        ({ nodeType, nodeValue }) => nodeType === Node.TEXT_NODE && !/^\s*$/.test(nodeValue ?? '')
      );
      expect(textNode.nodeValue).toBe('\xa0bar');
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    events.reset();
  });
});
