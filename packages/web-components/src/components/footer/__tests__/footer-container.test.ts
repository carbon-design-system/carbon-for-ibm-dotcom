/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation.js';
import { LocaleList } from '../../../globals/services-store/types/localeAPI';
import localeData from '../../locale-modal/__stories__/locale-data.json';
import { Default } from '../__stories__/footer.stories';

const minimumLocaleList: LocaleList = {
  regionList: [],
  localeModal: localeData.localeModal,
};

const template = (props?) => {
  return Default({
    parameters: {
      props: {
        FooterComposite: props,
      },
    },
  });
};

describe('dds-footer-container', function() {
  it('should use the given language', async function() {
    spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve(''));
    spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
    spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(minimumLocaleList));
    spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({}));
    render(template({ language: 'ko-KR' }), document.body);
    await Promise.resolve(); // For template update cycle to call `.firstUpdated()`
    await Promise.resolve(); // For `LocaleAPI.getLang()`
    await Promise.resolve(); // For `loadLang()`
    expect(LocaleAPI.getLang).not.toHaveBeenCalled();
  });

  it('should use the given lang display', async function() {
    spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
    spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(minimumLocaleList));
    spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({}));
    render(template({ langDisplay: 'lang-display-foo' }), document.body);
    await Promise.resolve(); // For template update cycle to call `.firstUpdated()`
    await Promise.resolve(); // For `LocaleAPI.getLangDisplay()`
    await Promise.resolve(); // For `loadLangDisplay()`
    expect(LocaleAPI.getLangDisplay).not.toHaveBeenCalled();
  });

  it('should use the given locale list', async function() {
    spyOn(LocaleAPI, 'getList'); // .and.returnValue(Promise.resolve(minimumLocaleList));
    spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({}));
    render(template({ language: 'en-US', localeList: minimumLocaleList }), document.body);
    await Promise.resolve(); // For template update cycle to call `.firstUpdated()`
    await Promise.resolve(); // For `LocaleAPI.getLang()`
    await Promise.resolve(); // For `loadLanguage()`
    await Promise.resolve(); // For `loadLocaleList()`
    expect(LocaleAPI.getList).not.toHaveBeenCalled();
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
