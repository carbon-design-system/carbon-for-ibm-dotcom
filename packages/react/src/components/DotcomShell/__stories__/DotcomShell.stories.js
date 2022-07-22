/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, object } from '@storybook/addon-knobs';
import Content from './data/content';
import DotcomShell from '../DotcomShell';
import { Micro as footerMicroStory } from '../../Footer/__stories__/Footer.stories.js';
import { Default as footerStory } from '../../Footer/__stories__/Footer.stories.js';
import { WithL1 as l1Story } from '../../Masthead/__stories__/Masthead.stories.js';
import languageItems from '../../Footer/__data__/language-items.json';
import { Default as mastheadStory } from '../../Masthead/__stories__/Masthead.stories.js';
import React from 'react';
import readme from '../README.stories.mdx';

const footerTypeOptions = {
  default: 'default',
  short: 'short',
  micro: 'micro',
};

const props = {
  default: () => {
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const disableLocaleButton = boolean(
      'hide the locale button (disableLocaleButton)',
      false,
      'Footer'
    );
    return {
      mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
      footerProps: {
        disableLocaleButton,
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
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
    return {
      mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false
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
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
    return {
      mastheadProps: {
        ...mastheadKnobs({ groupId: 'Masthead' }),
        searchOpenOnload: true,
      },
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false
        ),
      },
    };
  },

  withPlatform: () => {
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
    return {
      mastheadProps: {
        ...mastheadKnobs({ groupId: 'Masthead' }),
        platform: {
          name: 'IBM Cloud',
          url: 'https://www.ibm.com/cloud',
        },
      },
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false
        ),
      },
    };
  },

  shortFooter: () => {
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
    return {
      mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false
        ),
        type: 'short',
      },
    };
  },

  shortFooterLanguageOnly: () => {
    const languageOnly = true;
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
    return {
      mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        type: 'short',
        disableLocaleButton: boolean(
          'hide the locale button (disableLocaleButton)',
          false
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
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerMicroStory.story.parameters.knobs;
    const disableLocaleButton = boolean(
      'hide the locale button (disableLocaleButton)',
      false
    );
    return {
      mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        disableLocaleButton,
        type: 'micro',
      },
    };
  },

  microFooterLanguageOnly: () => {
    const languageOnly = true;
    const { Masthead: mastheadKnobs } = mastheadStory.story.parameters.knobs;
    const { Footer: footerKnobs } = footerMicroStory.story.parameters.knobs;
    return {
      mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
      footerProps: {
        ...footerKnobs({ groupId: 'Footer' }),
        type: 'micro',
        languageOnly,
        languageItems: !languageOnly
          ? undefined
          : object('language dropdown items (languageItems)', languageItems),
        languageInitialItem: { id: 'en', text: 'English' },
      },
    };
  },

  withL1: () => {
    const { Masthead: mastheadKnobs } = l1Story.story.parameters.knobs;
    return {
      platform: mastheadKnobs.l1Platform,
      mastheadProps: {
        ...mastheadKnobs({ groupId: 'Masthead' }),
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
