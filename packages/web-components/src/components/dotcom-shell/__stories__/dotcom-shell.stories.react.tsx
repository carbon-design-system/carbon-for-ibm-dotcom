/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, boolean, object } from '@storybook/addon-knobs';
import on from '../../../internal/vendor/@carbon/web-components/globals/mixins/on.js';
import React from 'react';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DDotcomShellContainer from '@carbon/ibmdotcom-web-components/es/components-react/dotcom-shell/dotcom-shell-container';
import C4DGlobalBanner from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner';
// eslint-disable-next-line max-len
import C4DGlobalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-image';
// eslint-disable-next-line max-len
import C4DGlobalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-heading';
import C4DGlobalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-copy';
import C4DButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import C4DMastheadContainer from '@carbon/ibmdotcom-web-components/es/components-react/masthead/masthead-container';
import C4DLeftNav from '../../masthead/left-nav';

import readme from './README.stories.react.mdx';
import {
  StoryContent,
  StoryContentNoToC,
  globalBanner as StoryGlobalBanner,
  tocContent,
  contentLeadspaceSearch,
} from './data/content.react';
import { mastheadL1Data as l1Data } from '../../masthead/__stories__/links';
import mockLangList from '../../footer/__stories__/language-list';
import { FOOTER_SIZE } from '../../footer/footer';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { TOC_TYPES } from '../../table-of-contents/defs';

// eslint-disable-next-line sort-imports
import img4Col from '../../../../../storybook-images/assets/global-banner/global-banner-4-col-image.jpg';
import img8Col from '../../../../../storybook-images/assets/global-banner/global-banner-8-col-image.jpg';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss?lit';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../../masthead/__stories__/profile-items';

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

const imageWidthOptions = {
  [`4 Columns`]: `4-col`,
  [`8 Columns`]: `8-col`,
  [`None`]: '',
};

const images = {
  '4-col': img4Col,
  '8-col': img8Col,
};

/**
 * Menu items knob data
 */
const menuItems = [
  'Products & Solutions',
  'Services & Consulting',
  'Learn & Support',
  'Explore more',
];

export const Default = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size={footerSize || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

export const DefaultFooterLanguageOnly = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
  } = args?.DotcomShell ?? {};
  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        language-selector-label="Choose a language"
        clear-selection-label="Clear language selection"
        selected-language="English"
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        langList={langList}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

DefaultFooterLanguageOnly.story = {
  name: 'Default footer language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('langlist', mockLangList),
      }),
    },
  },
};

export const searchOpenOnload = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        activate-search="true"
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        aunthenticatedProfileItems={authenticatedProfileItems || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        unauthenticatedProfileItems={unauthenticatedProfileItems || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

searchOpenOnload.story = {
  name: 'Search open onload',
};

export const withPlatform = (args) => {
  const {
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platformData.name || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        aunthenticatedProfileItems={authenticatedProfileItems || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        unauthenticatedProfileItems={unauthenticatedProfileItems || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        hasProfile: boolean('show the profile functionality (profile)', true),
        hasSearch: boolean('show the search functionality (search)', true),
        searchPlaceholder: text(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: text(
          'selected menu item (selected-menu-item)',
          'Services & Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
      }),
    },
  },
};

export const withShortFooter = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size="short"
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

withShortFooter.story = {
  name: 'With short footer',
};

export const withShortFooterLanguageOnly = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
  } = args?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>

      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size="short"
        language-selector-label="Choose a language"
        clear-selection-label="Clear language selection"
        selected-language="English"
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        langList={langList}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

withShortFooterLanguageOnly.story = {
  name: 'With short footer language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('langlist', mockLangList),
      }),
    },
  },
};

export const withMicroFooter = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size="micro"
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

withMicroFooter.story = {
  name: 'With micro footer',
};

export const withMicroFooterLanguageOnly = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
  } = args?.DotcomShell ?? {};

  const { langList, disableLocaleButton } = args?.FooterComposite ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size="micro"
        language-selector-label="Choose a language"
        clear-selection-label="Clear language selection"
        selected-language="English"
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        langList={langList}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

withMicroFooterLanguageOnly.story = {
  name: 'With micro footer language only',
  parameters: {
    knobs: {
      FooterComposite: () => ({
        disableLocaleButton: boolean(
          'hide the locale button (disable-locale-button)',
          false
        ),
        langList: object('langlist', mockLangList),
      }),
    },
  },
};

export const withL1 = (args) => {
  const {
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const contentConfig = {
    l1: true,
    leadspace: false,
    tocLayout: TOC_TYPES.DEFAULT,
  };

  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        language={language || null}
        lang-display={langDisplay || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        l1Data={l1Data}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent(contentConfig)}
      </C4DDotcomShellContainer>
    </>
  );
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      DotcomShell: () => ({
        hasProfile: boolean(
          'show the profile functionality (has-profile)',
          true
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: text(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: text(
          'selected menu item (selected-menu-item)',
          'Services & Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
      }),
    },
  },
};

export const WithHorizontalTOC = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  const contentConfig = {
    l1: false,
    leadspace: true,
    tocLayout: TOC_TYPES.HORIZONTAL,
  };
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size={footerSize || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent(contentConfig)}
      </C4DDotcomShellContainer>
    </>
  );
};

WithHorizontalTOC.story = {
  name: 'With ToC horizontal',
  parameters: {
    ...readme.parameters,
  },
};

export const WithLeadspaceSearch = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
  } = args?.DotcomShell ?? {};
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size={footerSize || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContentNoToC()}
      </C4DDotcomShellContainer>
    </>
  );
};

WithLeadspaceSearch.story = {
  name: 'With Lead space search',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
  },
};

export const WithGlobalBanner = (args) => {
  const {
    platform,
    hasProfile,
    userStatus,
    navLinks,
    hasSearch,
    searchPlaceholder,
    selectedMenuItem,
    langDisplay,
    language,
    footerSize,
    legalLinks,
    links: footerLinks,
    localeList,
    disableLocaleButton,
    imageWidth,
    heading,
    copy,
    ctaCopy,
  } = args?.DotcomShell ?? {};

  const bannerHeading = document.querySelector('cds-global-banner-heading');
  const bannerCopy = document.querySelector('cds-global-banner-copy');

  if (bannerHeading) {
    bannerHeading!.shadowRoot!.textContent = heading;
  }

  if (bannerCopy) {
    bannerCopy!.shadowRoot!.textContent = copy;
  }
  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      <C4DGlobalBanner image-width={imageWidth}>
        <C4DGlobalBannerImage
          slot="image"
          default-src={images[imageWidth]}></C4DGlobalBannerImage>
        <C4DGlobalBannerHeading slot="heading">
          {heading}
        </C4DGlobalBannerHeading>
        <C4DGlobalBannerCopy slot="copy">{copy}</C4DGlobalBannerCopy>
        <C4DButton
          slot="cta"
          cta-type="local"
          kind="tertiary"
          href="https://www.example.com">
          {ctaCopy}
        </C4DButton>
      </C4DGlobalBanner>
      <C4DDotcomShellContainer
        platform={platform || null}
        platform-url={platformData.url || null}
        language={language || null}
        lang-display={langDisplay || null}
        footer-size={footerSize || null}
        user-status={userStatus || null}
        searchPlaceholder={searchPlaceholder || null}
        selected-menu-item={selectedMenuItem || null}
        legalLinks={legalLinks || null}
        localeList={localeList || null}
        footerLinks={footerLinks || null}
        navLinks={navLinks}
        has-profile={hasProfile || null}
        has-search={hasSearch || null}
        disable-locale-button={disableLocaleButton || null}>
        {StoryContent()}
      </C4DDotcomShellContainer>
    </>
  );
};

WithGlobalBanner.story = {
  name: 'With Global banner',
  parameters: {
    knobs: {
      DotcomShell: () => ({
        hasProfile: boolean(
          'show the profile functionality (has-profile)',
          true
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: text(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: text(
          'selected menu item (selected-menu-item)',
          'Services & Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
        heading: text(
          'Global banner heading:',
          'Hybrid cloud and AI for smarter business'
        ),
        copy: text(
          'Global banner copy (optional):',
          'Las Vegas, June 15-18, 2025'
        ),
        ctaCopy: text('Global banner CTA copy:', 'Register for Think. Free'),
        imageWidth: select(
          'Global banner image width:',
          imageWidthOptions,
          '4-col'
        ),
      }),
    },
  },
};

export const WithoutShell = (args) => {
  const { masthead, globalBanner, leadspaceSearch, tocLayout } =
    args?.DotcomShell ?? {};

  return (
    <>
      <style type="text/css">{mastheadStyles.cssText}</style>
      {globalBanner ? StoryGlobalBanner(images['4-col']) : ''}
      {masthead === 'L0' ? (
        <C4DMastheadContainer id="masthead-container"></C4DMastheadContainer>
      ) : (
        <C4DMastheadContainer
          id="masthead-container"
          l1Data={l1Data}></C4DMastheadContainer>
      )}
      <main className="cds--content cds-ce-demo--ui-shell-content">
        {leadspaceSearch ? (
          <div className="cds--grid cds--col-lg-8">
            {contentLeadspaceSearch}
          </div>
        ) : (
          ''
        )}
        {tocLayout === 'none' ? (
          <div className="cds--grid cds--col-lg-8">{tocContent}</div>
        ) : (
          ''
        )}
        {tocLayout === null ? StoryContent() : ''}
        {tocLayout === 'horizontal'
          ? StoryContent({
              l1: false,
              leadspace: true,
              tocLayout: TOC_TYPES.HORIZONTAL,
            })
          : ''}
      </main>
    </>
  );
};

WithoutShell.story = {
  name: 'Without Shell (Fallback Utility)',
  parameters: {
    knobs: {
      DotcomShell: () => ({
        masthead: select('Masthead Version', ['L0', 'L1'], 'L0'),
        globalBanner: boolean('Has Global Banner', false),
        leadspaceSearch: boolean('Has Leadspace With Search', false),
        tocLayout: select(
          'Table of Contents Layout',
          { Vertical: null, Horizontal: 'horizontal', None: 'none' },
          null
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Dotcom shell',
  decorators: [
    (story) => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('cds-left-nav');
          if (leftNav) {
            (leftNav as C4DLeftNav).expanded = false;
          }
        });
      }
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      DotcomShell: () => ({
        platform: select(
          'Platform (platform)',
          { none: null, platform: platformData.name },
          null
        ),
        hasProfile: boolean('Show profile in masthead (profile)', true),
        hasSearch: boolean('Show search in masthead (search)', true),
        searchPlaceholder: text(
          'Search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: select(
          'Selected menu item (selected-menu-item)',
          menuItems,
          menuItems[1]
        ),
        userStatus: select(
          'User authentication (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
        disableLocaleButton: boolean(
          'Locale button (disable-locale-button)',
          false
        ),
        footerSize: select(
          'Footer size (footer-size)',
          footerSizes,
          FOOTER_SIZE.REGULAR
        ),
      }),
    },
  },
};
