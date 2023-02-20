/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSFooterContainer from '@carbon/ibmdotcom-web-components/es/components-react/footer/footer-container';
import mockLangList from './language-list';
import mockLinks from './links';
import mockLegalLinks from './legal-links';
import mockAdjunctLinks from './adjunct-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import styles from './footer.stories.scss';

import { FOOTER_SIZE } from '../footer';

import readme from './README.stories.react.mdx';

export const base = ({ parameters }) => {
  const {
    langDisplay,
    language,
    size,
    langList,
    legalLinks,
    links,
    localeList,
    disableLocaleButton,
    clearSelectionLabel,
    languageSelectorLabel,
    selectedLanguage,
    adjunctLinks,
  } = parameters?.props?.FooterComposite ?? {};
  return (
    <DDSFooterContainer
      language={language}
      lang-display={langDisplay}
      size={size}
      langList={langList}
      adjunctLinks={adjunctLinks}
      legalLinks={legalLinks}
      links={links}
      localeList={localeList}
      language-selector-label={languageSelectorLabel}
      clear-selection-label={clearSelectionLabel}
      selected-language={selectedLanguage}
      disable-locale-button={disableLocaleButton !== true && null}></DDSFooterContainer>
  );
};

export const Default = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    langList: '',
    adjunctLinks: [],
  };
  return base({ parameters });
};

export const defaultWithAdjunctLegalLinks = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    disableLocaleButton: false,
    size: FOOTER_SIZE.REGULAR,
  };
  return base({ parameters });
};

defaultWithAdjunctLegalLinks.story = {
  name: 'Default with adjunct legal links',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        adjunctLinks: object('adjunct links (adjunctLinks):', mockAdjunctLinks, groupId),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          adjunctLinks: mockAdjunctLinks,
        },
      },
    },
  },
};

export const defaultLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
    adjunctLinks: [],
  };
  return <div className="default-language-only">{base({ parameters })}</div>;
};

defaultLanguageOnly.story = {
  name: 'Default language only',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('language dropdown items (langList)', mockLangList, groupId),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langList: mockLangList,
        },
      },
    },
  },
};

export const short = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    langList: '',
    adjunctLinks: [],
  };
  return base({ parameters });
};

export const shortWithAdjunctLegalLinks = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
  };
  return base({ parameters });
};

shortWithAdjunctLegalLinks.story = {
  name: 'Short with adjunct legal links',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        adjunctLinks: object('adjunct links (adjunctLinks):', mockAdjunctLinks, groupId),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          adjunctLinks: mockAdjunctLinks,
        },
      },
    },
  },
};

export const shortLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
    adjunctLinks: [],
  };
  return base({ parameters });
};

shortLanguageOnly.story = {
  name: 'Short language only',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('language dropdown items (langList)', mockLangList, groupId),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langList: mockLangList,
        },
      },
    },
  },
};

export const micro = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    langList: '',
  };
  return base({ parameters });
};

export const microLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    languageSelectorLabel: 'Choose a language',
    clearSelectionLabel: 'Clear language selection',
    selectedLanguage: 'English',
  };
  return base({ parameters });
};

microLanguageOnly.story = {
  name: 'Micro language only',
  parameters: {
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
        langList: object('language dropdown items (langList)', mockLangList, groupId),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langList: mockLangList,
        },
      },
    },
  },
};

export default {
  title: 'Components/Footer',
  decorators: [
    story => {
      return (
        <>
          <style>{styles.cssText}</style>
          {story()}
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      FooterComposite: ({ groupId }) => ({
        disableLocaleButton: boolean('hide the locale button (disable-locale-button)', false, groupId),
      }),
    },
    propsSet: {
      default: {
        FooterComposite: {
          disableLocaleButton: false,
          langDisplay: 'United States - English',
          legalLinks: mockLegalLinks,
          adjunctLinks: mockLegalLinks,
          links: mockLinks,
          localeList: mockLocaleList,
        },
      },
    },
  },
  excludeStories: ['base'],
};
