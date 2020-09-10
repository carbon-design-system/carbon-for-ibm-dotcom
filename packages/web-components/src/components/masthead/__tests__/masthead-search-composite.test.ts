/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import EventManager from '../../../../tests/utils/event-manager';
import DDSMastheadSearchComposite from '../masthead-search-composite';

const template = (props?) => {
  const { language } = props ?? {};
  return html`
    <dds-masthead-search-composite language="${ifNonNull(language)}"></dds-masthead-search-composite>
  `;
};

describe('dds-masthead-search-composite', function() {
  const events = new EventManager();

  it('should trigger search API call', async function() {
    DDSMastheadSearchComposite.prototype._setLanguage = jasmine.createSpy().and.returnValue(Promise.resolve());
    DDSMastheadSearchComposite.prototype._loadSearchResults = jasmine.createSpy().and.returnValue(Promise.resolve());
    render(template({ language: 'en-US' }), document.body);
    await Promise.resolve(); // Update cycle of `<dds-masthead-search-composite>`
    await Promise.resolve(); // Update cycle of `<dds-masthead-search>`
    const search = document.querySelector('dds-masthead-search');
    (search!.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
    await Promise.resolve();
    const searchInputNode = search!.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
    searchInputNode.value = 'search-query-foo';
    searchInputNode.dispatchEvent(new CustomEvent('dds-masthead-search-input', { bubbles: true, composed: true }));
    expect(DDSMastheadSearchComposite.prototype._loadSearchResults).toHaveBeenCalledWith('search-query-foo');
  });

  afterEach(async function() {
    DDSMastheadSearchComposite.prototype._loadSearchResults = undefined;
    DDSMastheadSearchComposite.prototype._setLanguage = undefined;

    await render(undefined!, document.body);
    events.reset();
  });
});
