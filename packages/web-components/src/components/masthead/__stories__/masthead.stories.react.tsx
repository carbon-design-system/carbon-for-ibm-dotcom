/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DMastheadContainer from '@carbon/ibmdotcom-web-components/es/components-react/masthead/masthead-container';
import { mastheadL0Data, mastheadL1Data, mastheadLogoData } from './links';
import { C4D_CUSTOM_PROFILE_LOGIN } from '../../../globals/internal/feature-flags';
import { UNAUTHENTICATED_STATUS } from '@carbon/ibmdotcom-services-store/es/types/profileAPI.js';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const userStatuses = {
  authenticated: 'test.user@ibm.com',
  unauthenticated: UNAUTHENTICATED_STATUS,
};

const scopeParameters = [
  {
    name: 'All',
    appId: 'all',
    value: 'all',
  },
  {
    name: 'Analyst',
    appId: 'analyst',
    value: 'analyst',
  },
  {
    name: 'PartnerWorld',
    appId: 'pw',
    value: ['pw', 'pwp'],
  },
  {
    name: 'Developer',
    appId: 'dw',
    value: ['dw', 'dwaspera'],
  },
  {
    name: 'IBM Docs',
    appId: 'ibmdocs',
    label: 'Search Label',
    value: ['ibmdocs', 'dw'],
  },
];

async function customTypeaheadApiFunction(query) {
  return fetch(`https://www-api.ibm.com/search/typeahead/v1?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      let searchResults = [
        // Results not including "carbon"
        data.response
          .filter((result) => !result[0].toLowerCase().includes('carbon'))
          .map((result) => result[0]),
        // Optional grouped category results including "carbon"
        {
          title: 'Carbon',
          items: data.response
            .filter((result) => result[0].toLowerCase().includes('carbon'))
            .map((result) => ({
              name: result[0],
              href: `https://www.example.com/${encodeURIComponent(result[0])}`,
            })),
        },
      ];
      return searchResults;
    });
}

export const Default = (args) => {
  const {
    customProfileLogin,
    hasProfile,
    hasSearch,
    selectedMenuItem,
    searchPlaceholder,
    userStatus,
    useMock,
  } = args?.MastheadComposite ?? {};

  if (!hasSearch) {
    setTimeout(() => {
      document
        .querySelector('c4d-masthead-container')
        ?.removeAttribute('has-search');
    }, 1000);
  }
  if (useMock) {
    setTimeout(() => {
      const masthead = document.querySelector('c4d-masthead-container');
      if (masthead) {
        (masthead as any).navLinks = mastheadL0Data;
      }
    }, 1000);
  }
  return (
    <C4DMastheadContainer
      selected-menu-item={selectedMenuItem}
      user-status={userStatus}
      searchPlaceholder={searchPlaceholder}
      has-profile={hasProfile}
      has-search={hasSearch}
      custom-profile-login={customProfileLogin}></C4DMastheadContainer>
  );
};

export const WithCustomTypeahead = () => {
  document.documentElement.addEventListener(
    'c4d-search-with-typeahead-input',
    async (e) => {
      const results = await customTypeaheadApiFunction(
        (e as CustomEvent).detail.value
      );
      document.dispatchEvent(
        new CustomEvent('c4d-custom-typeahead-api-results', { detail: results })
      );
    }
  );

  return (
    <C4DMastheadContainer custom-typeahead-api={true}></C4DMastheadContainer>
  );
};

WithCustomTypeahead.story = {
  name: 'With custom typeahead',
  parameters: {
    knobs: {
      MastheadComposite: () => ({}),
    },
  },
};

export const searchOpenOnload = (args) => {
  const { searchPlaceholder } = args?.MastheadComposite ?? {};

  return (
    <C4DMastheadContainer
      activate-search="true"
      searchPlaceholder={searchPlaceholder}></C4DMastheadContainer>
  );
};

searchOpenOnload.story = {
  name: 'Search open onload',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
      }),
    },
  },
};

export const withPlatform = (args) => {
  const { platform, platformUrl } = args?.WithPlatform ?? {};

  if (platformUrl) {
    setTimeout(() => {
      const masthead = document.querySelector('c4d-masthead-container');
      if (masthead) {
        (masthead as any).platformUrl = platformUrl;
      }
    }, 1000);
  }

  return <C4DMastheadContainer platform={platform}></C4DMastheadContainer>;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: () => ({}),
      WithPlatform: () => ({
        platform: textNullable('platform name (platform)', 'Platform'),
        platformUrl: textNullable(
          'platform url (platformUrl)',
          'https://www.ibm.com'
        ),
      }),
    },
  },
};

export const withL1 = (args) => {
  const { selectedMenuItem } = args?.MastheadComposite ?? {};

  setTimeout(() => {
    const masthead = document.querySelector('c4d-masthead-container');
    if (masthead) {
      (masthead as any).l1Data = mastheadL1Data;
    }
  }, 1000);

  return (
    <C4DMastheadContainer
      selected-menu-item={selectedMenuItem}></C4DMastheadContainer>
  );
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Products'
        ),
      }),
    },
  },
};

export const withAlternateLogoAndTooltip = (args) => {
  const { mastheadLogo } = args?.MastheadComposite ?? {};

  if (mastheadLogo === 'alternateWithTooltip') {
    setTimeout(() => {
      const masthead = document.querySelector('c4d-masthead-container');
      if (masthead) {
        (masthead as any).logoData = mastheadLogoData;
      }
    }, 1000);
  }

  return <C4DMastheadContainer></C4DMastheadContainer>;
};

withAlternateLogoAndTooltip.story = {
  name: 'With alternate logo and tooltip',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        mastheadLogo: select(
          'masthead logo data (logoData)',
          {
            defaultWithNoTooltip: null,
            alternateWithTooltip: 'alternateWithTooltip',
          },
          'alternateWithTooltip'
        ),
      }),
    },
  },
};

export const WithScopedSearch = () => {
  setTimeout(() => {
    const masthead = document.querySelector('c4d-masthead-container');
    if (masthead) {
      (masthead as any).scopeParameters = scopeParameters;
    }
  }, 1000);

  return <C4DMastheadContainer></C4DMastheadContainer>;
};

WithScopedSearch.story = {
  name: 'With scoped search',
  parameters: {
    knobs: {
      MastheadComposite: () => ({}),
    },
  },
};

export default {
  title: 'Components/Masthead',
  decorators: [
    (story) => {
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      MastheadComposite: () => ({
        hasProfile: select(
          'show the profile functionality (has-profile)',
          ['true', 'false'],
          'true'
        ),
        hasSearch: select(
          'show the search functionality (has-search)',
          ['true', 'false'],
          'true'
        ),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Consulting & Services'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
        customProfileLogin:
          C4D_CUSTOM_PROFILE_LOGIN &&
          textNullable(
            'custom profile login url (customProfileLogin)',
            'https://www.example.com/'
          ),
        useMock: boolean('use mock nav data', false),
      }),
    },
  },
};
