/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { forEach } from '../../../globals/internal/collection-helpers';
import { LocaleList } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  BasicLink,
  BasicLinkSet,
} from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import '../footer-composite';
import { Default } from '../__stories__/footer.stories';

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

const footerLinksFoo: BasicLinkSet[] = [
  {
    title: 'group-title-foo',
    links: [
      {
        title: 'item-title-foo-foo',
        url: 'https://dummy.ibm.com/foo/foo',
      },
      {
        title: 'item-title-foo-bar',
        url: 'https://dummy.ibm.com/foo/bar',
      },
    ],
  },
  {
    title: 'group-title-bar',
    links: [
      {
        title: 'item-title-bar-foo',
        url: 'https://dummy.ibm.com/bar/foo',
      },
      {
        title: 'item-title-bar-bar',
        url: 'https://dummy.ibm.com/bar/bar',
      },
    ],
  },
];

const legalLinksFoo: BasicLink[] = [
  {
    title: 'title-foo',
    url: 'https://dummy.ibm.com/foo',
  },
  {
    title: 'title-bar',
    url: 'https://dummy.ibm.com/bar',
  },
];

const template = (props?) =>
  Default({
    FooterComposite: props,
    Other: {
      useMock: true,
    },
  });

const setupLinkAlternate = (set: boolean = true) => {
  if (!set) {
    forEach(
      document.querySelectorAll('link[rel="alternate][hreflang]'),
      (item) => {
        item.parentNode!.removeChild(item);
      }
    );
  } else {
    document.head.insertAdjacentHTML(
      'beforeend',
      `
        <link rel="alternate" hreflang="locale-id-foo" href="https://example.com/locale-id-foo">
        <link rel="alternate" hreflang="locale-id-bar" href="https://example.com/locale-id-bar">
        <link rel="alternate" hreflang="locale-id-baz" href="https://example.com/locale-id-baz">
        <link rel="alternate" hreflang="locale-id-qux" href="https://example.com/locale-id-qux">
        <link rel="alternate" hreflang="locale-id-quux" href="https://example.com/locale-id-quux">
      `
    );
  }
};

describe('dds-footer-composite', function () {
  describe('Misc attributes', function () {
    it('should render minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.querySelector('dds-footer-composite')).toMatchSnapshot();
    });

    it('should render various attributes', async function () {
      setupLinkAlternate();
      render(
        template({
          langDisplay: 'lang-display-foo',
          language: 'ko-KR',
          openLocaleModal: true,
          legalLinks: legalLinksFoo,
          links: footerLinksFoo,
          localeList: localeListFoo,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.querySelector('dds-footer-composite')).toMatchSnapshot();
    });
  });

  afterEach(function () {
    setupLinkAlternate(false);
    render(undefined!, document.body);
  });
});
