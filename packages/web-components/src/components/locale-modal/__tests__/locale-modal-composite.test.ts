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
import { LocaleList } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
// Above import is interface-only ref and thus code won't be brought into the build
import '../locale-modal-container';
import localeData from '../__stories__/locale-data.json';

const minimumLocaleList: LocaleList = {
  regionList: [],
  localeModal: localeData.localeModal,
};

const localeListFoo: LocaleList = {
  regionList: [
    {
      name: 'region-name-foo',
      key: 'region-key-foo',
      countryList: [
        {
          name: 'country-name-foo',
          locale: [
            ['locale-id-foo', 'language-foo'],
            ['locale-id-bar', 'language-bar'],
          ],
        },
      ],
    },
    {
      name: 'region-name-bar',
      key: 'region-key-bar',
      countryList: [
        {
          name: 'country-name-bar',
          locale: [['locale-id-baz', 'language-baz']],
        },
        {
          name: 'country-name-baz',
          locale: [
            ['locale-id-qux', 'language-qux'],
            ['locale-id-quux', 'language-quux'],
          ],
        },
      ],
    },
  ],
  localeModal: {
    headerTitle: 'header-title-foo',
    modalClose: 'modal-close-foo',
    searchLabel: 'search-label-foo',
    searchClearText: 'search-clear-text-foo',
    searchPlaceholder: 'search-placeholder-foo',
    availabilityText: 'availability-text-foo',
    unavailabilityText: 'unavailability-text-foo',
  },
};

const template = (props?) => {
  const { langDisplay, language, open, localeList } = props ?? {};
  return html`
    <dds-locale-modal-composite
      lang-display="${ifNonNull(langDisplay)}"
      language="${ifNonNull(language)}"
      ?open="${open}"
      .localeList="${ifNonNull(localeList)}">
    </dds-locale-modal-composite>
  `;
};

describe('dds-locale-modal-composite', function () {
  describe('Misc attributes', function () {
    it('should render minimum attributes', async function () {
      render(template({ localeList: minimumLocaleList }), document.body);
      await Promise.resolve();
      expect(document.querySelector('dds-locale-modal')).toMatchSnapshot();
    });

    it('should render various attributes', async function () {
      render(
        template({
          langDisplay: 'lang-display-foo',
          open: true,
          localeList: localeListFoo,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.querySelector('dds-locale-modal')).toMatchSnapshot();
    });
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});
