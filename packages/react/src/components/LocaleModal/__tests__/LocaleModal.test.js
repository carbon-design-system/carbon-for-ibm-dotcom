/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { localeData, getList } from './LocaleModal.data';
import LocaleModal, { _close, sortList } from '../LocaleModal';
import LocaleModalCountries, {
  _setCookie,
  filterLocale,
} from '../LocaleModalCountries';
import LocaleModalRegions, {
  addLocaleBackBtnListeners,
  localeBackActive,
} from '../LocaleModalRegions';
import ipcinfoCookie from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/ipcinfoCookie/ipcinfoCookie';
import LocaleAPI from '../../../internal/vendor/@carbon/ibmdotcom-services/services/Locale/Locale';
import { mount } from 'enzyme';
import React from 'react';

const localeDisplay = 'Testing';

const setupModal = (props) =>
  new Promise((resolve) => {
    let wrapper;
    if (props) {
      wrapper = mount(
        <LocaleModal localeDisplay={localeDisplay} localeData={localeData} />
      );
    } else {
      wrapper = mount(<LocaleModal />);
    }
    setTimeout(() => resolve(wrapper), 3000);
  });

describe('LocaleModal', () => {
  window.innerHtml += `<div class="bx--locale-btn__container"><button class="bx--btn--secondary">test</button></div>`;
  LocaleAPI.getLangDisplay = jest.fn(() => 'United States — English');

  it('Renders properly', async () => {
    LocaleAPI.getLocale = jest.fn(() => ({ cc: 'us', lc: 'en' }));
    LocaleAPI.getList = jest.fn(() => getList);
    const wrapper = await setupModal(false);
    const footerBtn = document.createElement('div');
    footerBtn.innerHTML = `<div class="bx--locale-btn__container"><div class="bx--btn--secondary">test</div></div>`;
    window.innerHtml += footerBtn;
    _close(jest.fn(), jest.fn());
    wrapper.find('.bx--modal-close').simulate('click');
  });
});

describe('LocaleModalCountries', () => {
  it('Tests _setCookie', () => {
    const spy = jest.fn(() => {});
    ipcinfoCookie.set = spy;
    _setCookie('us-en');
    expect(spy).toHaveBeenCalledWith({ cc: 'en', lc: 'us' });
  });

  it('Renders properly', () => {
    const spyClearResults = jest.fn(() => {});
    const wrapper = mount(
      <LocaleModalCountries
        regionList={localeData.regionList}
        setClearResults={spyClearResults}
        {...localeData.localeModal}
      />
    );
    wrapper.find('input.bx--search-input').value = 'Brazi';
    wrapper.find('input.bx--search-input').simulate('keyup');

    const setClearResults = jest.fn((val) => val);
    const localeFilter = document.createElement('input');
    localeFilter.value = 'Brazil';
    const localeText = document.createElement('div');
    const localeItem = `<div class="bx-locale-modal__list"><a><div>Brazil</div></a></div>`;
    document.body.innerHTML = localeItem;

    filterLocale(
      setClearResults,
      localeFilter,
      `bx--locale-modal__locales-hidden`,
      localeText,
      { unavailabilityText: 'unavailable', AvailabilityText: 'available' }
    );

    const btn = document.createElement('div');
    btn.innerHTML = `
      <div tabindex="1" role="button" aria-label="label"></div>
    `;
    document.body.innerHTML += `<input value="test" id="bx--locale-modal__filter" />`;
    localeBackActive(
      btn,
      jest.fn(() => {}),
      jest.fn(() => {})
    );

    document.body.innerHTML += `<div class="bx--card" id="test-card"></div>`;
    document.querySelector('#test-card').dispatchEvent(new MouseEvent('click'));
  });
});

describe('Locale Modal Regions', () => {
  it('handles the listeners properly', () => {
    const setCurrentRegionSpy = jest.fn();
    const setIsFilteringSpy = jest.fn();
    const setClearResultsSpy = jest.fn();
    const wrapper = mount(
      <LocaleModalRegions
        regionList={sortList(localeData)}
        setCurrentRegion={setCurrentRegionSpy}
        setIsFiltering={setIsFilteringSpy}
        setClearResults={setClearResultsSpy}
        returnButtonLabel={`Return button`}
      />
    );
    wrapper.find('.bx--tile').at(0).simulate('click');
    const testButton = document.createElement('button');
    testButton.innerText = 'testing';
    addLocaleBackBtnListeners(
      [testButton],
      'testing',
      setIsFilteringSpy,
      setClearResultsSpy
    );
    testButton.dispatchEvent(new MouseEvent('click'));
    testButton.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 32 }));
    testButton.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 13 }));
    wrapper.find('.bx--card').at(0).simulate('click');
  });
});
