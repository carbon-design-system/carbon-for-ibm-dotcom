/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text, object } from '@storybook/addon-knobs';
import Content from './data/content';
import DotcomShell from '../DotcomShell';
import languageItems from '../../Footer/__data__/language-items.json';
import mastheadLinks from '../../Masthead/__stories__/data/MastheadLinks';
import React from 'react';
import readme from '../README.stories.mdx';

const footerTypeOptions = {
  default: 'default',
  short: 'short',
  micro: 'micro',
};

const mastheadKnobs = () => {
  return {
    navigation: 'default',
    hasProfile: boolean(
      'show the profile functionality (hasProfile)',
      true,
      'Masthead'
    ),
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true,
      'Masthead'
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM',
      'Masthead'
    ),
    initialSearchTerm: text(
      'initial search term (initialSearchTerm)',
      '',
      'Masthead'
    ),
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      `Consulting & Services`,
      'Masthead'
    ),
  };
};

const props = {
  default: () => {
    return {
      mastheadProps: mastheadKnobs(),
      footerProps: {
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
        type: select(
          'Footer (footerProps): sets the type of footer (type)',
          footerTypeOptions,
          footerTypeOptions.default,
          'Footer'
        ),
      },
    };
  },

  defaultLanguageOnly: () => {
    const languageOnly = true;
    return {
      mastheadProps: mastheadKnobs(),
      footerProps: {
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
        type: select(
          'Footer (footerProps): sets the type of footer (type)',
          footerTypeOptions,
          footerTypeOptions.default,
          'Footer'
        ),
        languageOnly,
        languageItems: !languageOnly
          ? undefined
          : object('language dropdown items (languageItems)', languageItems),
        languageInitialItem: { id: 'en', text: 'English' },
      },
    };
  },

  searchOpenByDefault: () => {
    return {
      mastheadProps: {
        ...mastheadKnobs(),
        searchOpenOnload: true,
      },
      footerProps: {
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
        type: select(
          'Footer (footerProps): sets the type of footer (type)',
          footerTypeOptions,
          footerTypeOptions.default,
          'Footer'
        ),
      },
    };
  },

  withPlatform: () => {
    return {
      mastheadProps: {
        ...mastheadKnobs(),
        platform: {
          name: 'IBM Cloud',
          url: 'https://www.ibm.com/cloud',
        },
      },
      footerProps: {
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
      },
    };
  },

  shortFooter: () => {
    return {
      mastheadProps: mastheadKnobs(),
      footerProps: {
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
        type: 'short',
      },
    };
  },

  shortFooterLanguageOnly: () => {
    const languageOnly = true;
    return {
      mastheadProps: mastheadKnobs(),
      footerProps: {
        type: 'short',
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
        languageOnly,
        languageItems: !languageOnly
          ? undefined
          : object('language dropdown items (languageItems)', languageItems),
        languageInitialItem: { id: 'en', text: 'English' },
      },
    };
  },

  microFooter: () => {
    return {
      mastheadProps: mastheadKnobs(),
      footerProps: {
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false,
          'Footer'
        ),
        type: 'micro',
      },
    };
  },

  microFooterLanguageOnly: () => {
    const languageOnly = true;
    return {
      mastheadProps: mastheadKnobs(),
      footerProps: {
        type: 'micro',
        languageOnly,
        languageItems: !languageOnly
          ? undefined
          : object('language dropdown items (languageItems)', languageItems),
        languageInitialItem: { id: 'en', text: 'English' },
        footerProps: {
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            'Footer'
          ),
        },
      },
    };
  },

  withL1: () => {
    return {
      mastheadProps: {
        platform: {
          name: 'Stock Charts',
          url: 'https://www.example.com',
        },
        hasProfile: boolean(
          'show the profile functionality (hasProfile)',
          true
        ),
        hasSearch: boolean('show the search functionality (hasSearch)', true),
        placeHolderText: text(
          'search placeholder (placeHolderText)',
          'Search all of IBM'
        ),
        mastheadL1Data: {
          navigationL1: mastheadLinks,
        },
        selectedMenuItem: text(
          'selected menu item (selectedMenuItem)',
          'Lorem ipsum dolor sit amet'
        ),
      },
    };
  },
};

export default {
  title: 'Components/Dotcom shell',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
  },
};

export const Default = () => {
  const { mastheadProps, footerProps } = props.default() ?? {};

  console.log(props.default());
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.default()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

export const DefaultLanguageOnly = () => {
  const { mastheadProps, footerProps } = props.defaultLanguageOnly() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.defaultLanguageOnly()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

DefaultLanguageOnly.story = {
  name: 'Default (footer language only)',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const SearchOpenByDefault = () => {
  const { mastheadProps, footerProps } = props.searchOpenByDefault() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.searchOpenByDefault()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

SearchOpenByDefault.story = {
  name: 'Search open',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const WithPlatform = () => {
  const { mastheadProps, footerProps } = props.withPlatform() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.withPlatform()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

WithPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const ShortFooter = () => {
  const { mastheadProps, footerProps } = props.shortFooter() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.shortFooter()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

ShortFooter.story = {
  name: 'With short footer',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const ShortFooterLanguageOnly = () => {
  const { mastheadProps, footerProps } = props.shortFooterLanguageOnly() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.shortFooterLanguageOnly()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

ShortFooterLanguageOnly.story = {
  name: 'With short footer (language only)',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const MicroFooter = () => {
  const { mastheadProps, footerProps } = props.microFooter() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.microFooter()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

MicroFooter.story = {
  name: 'With micro footer',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const MicroFooterLanguageOnly = () => {
  const { mastheadProps, footerProps } = props.microFooterLanguageOnly() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.microFooterLanguageOnly()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};

MicroFooterLanguageOnly.story = {
  name: 'With micro footer (language only)',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const WithL1 = () => {
  const { mastheadProps, footerProps } = props.withL1() ?? {};
  return (
    <DotcomShell
      mastheadProps={mastheadProps}
      footerProps={footerProps}
      {...props.withL1()}>
      <main id="main-content">
        <Content withL1={!!mastheadProps.mastheadL1Data} />
      </main>
    </DotcomShell>
  );
};
WithL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
