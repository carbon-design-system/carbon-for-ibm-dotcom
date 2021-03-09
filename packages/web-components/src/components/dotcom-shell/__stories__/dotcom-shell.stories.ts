/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select, object } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../../masthead/left-nav';
import '../dotcom-shell-container';
import { authenticatedProfileItems, unauthenticatedProfileItems } from '../../masthead/__stories__/profile-items';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss';
import { FOOTER_SIZE } from '../../footer/footer';
import mastheadLinks, { l1Data } from '../../masthead/__stories__/links';
import mockLangList from '../../footer/__stories__/language-list';
import mockFooterLinks from '../../footer/__stories__/links';
import mockLegalLinks from '../../footer/__stories__/legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../../content-block/content-block-copy';
import '../../content-item-horizontal/content-item-horizontal';
import '../../content-item-horizontal/content-item-horizontal-copy';
import '../../content-item-horizontal/content-item-horizontal-eyebrow';
import '../../leadspace-block/leadspace-block';
import '../../leadspace-block/leadspace-block-content';
import '../../leadspace-block/leadspace-block-cta';
import '../../leadspace-block/leadspace-block-heading';
import '../../leadspace-block/leadspace-block-media';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../../quote/quote';
import '../../quote/quote-source-bottom-copy';
import '../../quote/quote-source-copy';
import '../../quote/quote-source-heading';
import readme from './README.stories.mdx';
import StoryContent from './data/content';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';

const userStatuses = {
  authenticated: 'test.user@ibm.com',
  unauthenticated: UNAUTHENTICATED_STATUS,
};

/**
 * platform knob data
 */
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

const footerSizes = {
  Default: FOOTER_SIZE.REGULAR,
  [`Short (${FOOTER_SIZE.SHORT})`]: FOOTER_SIZE.SHORT,
  [`Micro (${FOOTER_SIZE.MICRO})`]: FOOTER_SIZE.MICRO,
};

export const Default = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, footerSize, legalLinks, links: footerLinks, localeList } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

Default.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        footerSize: select('Size (footer-size)', footerSizes, FOOTER_SIZE.REGULAR, groupId),
      }),
    },
  },
};

export const DefaultFooterLanguageOnly = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList, langList } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

DefaultFooterLanguageOnly.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        langList: object('langlist', mockLangList, groupId),
      }),
    },
  },
};

export const searchOpen = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            activate-search="true"
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            activate-search="true"
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .langList="${mockLangList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export const withPlatform = ({ parameters }) => {
  const { profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform=${platformData.name}
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform=${platformData.name}
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withPlatform.story = {
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        profile: boolean('show the profile functionality (profile)', true, groupId),
        search: boolean('show the search functionality (search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
  },
};

export const withShortFooter = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export const withShortFooterLanguageOnly = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList, langList } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="short"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withShortFooterLanguageOnly.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        langList: object('langlist', mockLangList, groupId),
      }),
    },
  },
};

export const withMicroFooter = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export const withMicroFooterLanguageOnly = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList, langList } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="micro"
            language-selector-label="Choose a language"
            clear-selection-label="Clear language selection"
            selected-language="English"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            user-status="${ifNonNull(userStatus)}"
            .langList="${langList}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

withMicroFooterLanguageOnly.story = {
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        langList: object('langlist', mockLangList, groupId),
      }),
    },
  },
};

export const withL1 = ({ parameters }) => {
  const { platform, profile, userStatus, navLinks, search, searchPlaceholder, selectedMenuItem } =
    parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            platform-url="${ifNonNull(platformData.url)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceHolder="${searchPlaceholder}"
            selected-menu-item="${selectedMenuItem}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            .profile="${profile}"
            .search="${search}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export default {
  title: 'Components/Dotcom shell',
  decorators: [
    story => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('dds-left-nav');
          if (leftNav) {
            (leftNav as DDSLeftNav).expanded = false;
          }
        });
      }
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    knobs: {
      escapeHTML: false,
      MastheadComposite: ({ groupId }) => ({
        platform: select('Platform (platform)', { none: null, platform: platformData.name }, null, groupId),
        profile: boolean('show the profile functionality (profile)', true, groupId),
        search: boolean('show the search functionality (search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links and lets `<dds-footer-container>` load the footer links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        MastheadComposite: {
          navLinks: !useMock ? undefined : mastheadLinks,
        },
        FooterComposite: {
          langDisplay: !useMock ? undefined : 'United States - English',
          legalLinks: !useMock ? undefined : mockLegalLinks,
          links: !useMock ? undefined : mockFooterLinks,
          localeList: !useMock ? undefined : mockLocaleList,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
