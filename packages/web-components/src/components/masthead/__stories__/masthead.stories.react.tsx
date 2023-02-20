/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSMastheadContainer from '@carbon/ibmdotcom-web-components/es/components-react/masthead/masthead-container';
import { mastheadL1Data, logoData } from './links';
import { DDS_CUSTOM_PROFILE_LOGIN } from '../../../globals/internal/feature-flags';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

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

async function customTypeaheadApiFunction(searchVal) {
  return fetch(`https://ibmdocs-dev.mybluemix.net/docs/api/v1/suggest?query=${searchVal}&lang=undefined&categories=&limit=6`)
    .then(response => response.json())
    .then(data => {
      const searchResults = [
        data.hints,
        {
          title: 'Product pages',
          items: data.products,
        },
      ];
      return searchResults;
    });
}

export const Default = ({ parameters }) => {
  const { customProfileLogin, platform, hasProfile, hasSearch, selectedMenuItem, searchPlaceholder, userStatus, navLinks } =
    parameters?.props?.MastheadComposite ?? {};

  if (!hasSearch) {
    setTimeout(() => {
      document.querySelector('dds-masthead-container')?.removeAttribute('has-search');
    }, 1000);
  }
  return (
    <DDSMastheadContainer
      platform={platform}
      platformUrl={platformData.url}
      selected-menu-item={selectedMenuItem}
      user-status={userStatus}
      searchPlaceholder={searchPlaceholder}
      navLinks={navLinks}
      has-profile={hasProfile}
      has-search={hasSearch}
      custom-profile-login={customProfileLogin}></DDSMastheadContainer>
  );
};

export const WithCustomTypeahead = ({ parameters }) => {
  const { customProfileLogin, navLinks, platform, selectedMenuItem, userStatus, searchPlaceholder, hasProfile, hasSearch } =
    parameters?.props?.MastheadComposite ?? {};

  document.documentElement.addEventListener('dds-search-with-typeahead-input', async e => {
    const results = await customTypeaheadApiFunction((e as CustomEvent).detail.value);
    document.dispatchEvent(new CustomEvent('dds-custom-typeahead-api-results', { detail: results }));
  });

  return (
    <DDSMastheadContainer
      platform={platform}
      platformUrl={platformData.url}
      selected-menu-item={selectedMenuItem}
      user-status={userStatus}
      searchPlaceholder={searchPlaceholder}
      navLinks={navLinks}
      has-profile={hasProfile}
      has-search={hasSearch}
      custom-profile-login={customProfileLogin}
      custom-typeahead-api={true}></DDSMastheadContainer>
  );
};

WithCustomTypeahead.story = {
  name: 'With custom typeahead',
};

export const searchOpenOnload = ({ parameters }) => {
  const { customProfileLogin, platform, selectedMenuItem, userStatus, searchPlaceholder, hasProfile, hasSearch, navLinks } =
    parameters?.props?.MastheadComposite ?? {};

  if (!hasSearch) {
    setTimeout(() => {
      document.querySelector('dds-masthead-container')?.removeAttribute('has-search');
    }, 1000);
  }
  return (
    <DDSMastheadContainer
      activate-search="true"
      platform={platform}
      platformUrl={platformData.url}
      selected-menu-item={selectedMenuItem}
      user-status={userStatus}
      searchPlaceholder={searchPlaceholder}
      navLinks={navLinks}
      has-profile={hasProfile}
      has-search={hasSearch}
      custom-profile-login={customProfileLogin}></DDSMastheadContainer>
  );
};

searchOpenOnload.story = {
  name: 'Search open onload',
};

export const withPlatform = ({ parameters }) => {
  const { userStatus, navLinks, hasProfile, hasSearch, searchPlaceholder } = parameters?.props?.MastheadComposite ?? {};

  if (!hasSearch) {
    setTimeout(() => {
      document.querySelector('dds-masthead-container')?.removeAttribute('has-search');
    }, 1000);
  }

  return (
    <DDSMastheadContainer
      platform={'Platform'}
      platformUrl={platformData.url}
      user-status={userStatus}
      searchPlaceholder={searchPlaceholder}
      navLinks={navLinks}
      has-profile={hasProfile}
      has-search={hasSearch}></DDSMastheadContainer>
  );
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
  },
};

export const withL1 = ({ parameters }) => {
  const { selectedMenuItem, userStatus, navLinks, hasProfile, hasSearch } = parameters?.props?.MastheadComposite ?? {};

  if (!hasSearch) {
    setTimeout(() => {
      document.querySelector('dds-masthead-container')?.removeAttribute('has-search');
    }, 1000);
  }
  return (
    <DDSMastheadContainer
      selected-menu-item={selectedMenuItem}
      user-status={userStatus}
      has-profile={hasProfile}
      has-search={hasSearch}
      l1Data={mastheadL1Data}
      navLinks={navLinks}></DDSMastheadContainer>
  );
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Products', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
  },
};

export const withAlternateLogoAndTooltip = ({ parameters }) => {
  const { selectedMenuItem, userStatus, navLinks, hasProfile, hasSearch, searchPlaceholder, mastheadLogo } =
    parameters?.props?.MastheadComposite ?? {};

  if (!hasSearch) {
    setTimeout(() => {
      document.querySelector('dds-masthead-container')?.removeAttribute('has-search');
    }, 1000);
  }

  return (
    <DDSMastheadContainer
      selected-menu-item={selectedMenuItem}
      user-status={userStatus}
      searchPlaceholder={searchPlaceholder}
      navLinks={navLinks}
      logoData={mastheadLogo === 'alternateWithTooltip' ? logoData : null}
      has-profile={hasProfile}
      has-search={hasSearch}></DDSMastheadContainer>
  );
};

withAlternateLogoAndTooltip.story = {
  name: 'With alternate logo and tooltip',
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services', groupId),
        mastheadLogo: select(
          'masthead logo data (logoData)',
          { defaultWithNoTooltip: null, alternateWithTooltip: 'alternateWithTooltip' },
          'alternateWithTooltip',
          groupId
        ),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
      }),
    },
  },
};

export default {
  title: 'Components/Masthead',
  decorators: [
    story => {
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
        customProfileLogin:
          DDS_CUSTOM_PROFILE_LOGIN &&
          textNullable('custom profile login url (customProfileLogin)', 'https://www.example.com/', groupId),
      }),
    },
  },
};
