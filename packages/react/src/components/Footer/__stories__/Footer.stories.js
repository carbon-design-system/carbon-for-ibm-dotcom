/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './footer.stories.scss';
import { boolean, object } from '@storybook/addon-knobs';
import { Footer } from '../';
import footerMenu from '../__data__/footer-menu.json';
import footerThin from '../__data__/footer-thin.json';
import inPercy from '@percy-io/in-percy';
import languageItems from '../__data__/language-items.json';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Footer',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
  },
};

export const Default = ({ parameters }) => {
  const {
    type,
    isCustom,
    navigation,
    disableLocaleButton,
    languageOnly,
    items,
    languageInitialItem,
    languageCallback,
    adjunctLinks,
  } = parameters?.props?.Footer ?? {};

  return (
    <Footer
      navigation={isCustom ? navigation : null}
      type={type}
      disableLocaleButton={disableLocaleButton}
      langCode={inPercy() ? { lc: 'en', cc: 'us' } : null}
      languageOnly={languageOnly}
      languageItems={languageOnly ? items : null}
      languageInitialItem={languageInitialItem}
      languageCallback={languageCallback}
      adjunctLinks={adjunctLinks}
    />
  );
};

Default.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        return {
          languageInitialItem: { id: 'en', text: 'English' },
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            groupId
          ),
        };
      },
    },
  },
};

export const DefaultWithAdjunctLegalLinks = ({ parameters }) => {
  const {
    type,
    isCustom,
    navigation,
    disableLocaleButton,
    languageOnly,
    items,
    languageInitialItem,
    languageCallback,
  } = parameters?.props?.Footer ?? {};

  return (
    <Footer
      navigation={isCustom ? navigation : null}
      type={type}
      disableLocaleButton={disableLocaleButton}
      langCode={inPercy() ? { lc: 'en', cc: 'us' } : null}
      languageOnly={languageOnly}
      languageItems={languageOnly ? items : null}
      languageInitialItem={languageInitialItem}
      languageCallback={languageCallback}
      adjunctLinks={[
        {
          title: 'Read the updated Terms of Use.',
          url: 'https://www.example.com',
        },
        {
          title: 'Read Learning Technologies Privacy',
          url: 'https://www.example.com',
        },
      ]}
    />
  );
};

DefaultWithAdjunctLegalLinks.story = {
  name: 'Default with adjunct legal links',
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        return {
          languageInitialItem: { id: 'en', text: 'English' },
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            groupId
          ),
        };
      },
    },
  },
};

export const DefaultLanguageOnly = ({ parameters }) => {
  const massagedParameters = {
    ...parameters,
    props: {
      Footer: {
        ...(parameters?.props?.Footer ?? {}),
      },
    },
  };

  return (
    <div className="default-language-only">
      <Default parameters={massagedParameters} />
    </div>
  );
};

DefaultLanguageOnly.story = {
  name: 'Default language only',
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const languageOnly = true;

        return {
          languageOnly,
          items: !languageOnly
            ? undefined
            : object(
                'language dropdown items (languageItems)',
                languageItems,
                groupId
              ),
          languageInitialItem: { id: 'en', text: 'English' },
        };
      },
    },
  },
};

/**
 * Footer (short)
 *
 * @returns {*} CSF story
 */
export const Short = ({ parameters }) => {
  const massagedParameters = {
    ...parameters,
    props: {
      Footer: {
        ...(parameters?.props?.Footer ?? {}),
        type: 'short',
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default parameters={massagedParameters} />
    </div>
  );
};

Short.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const isCustom = boolean(
          'show custom navigation (not a prop)',
          inPercy(),
          groupId
        );
        return {
          isCustom,
          navigation: isCustom
            ? object(
                'custom navigation data (navigation)',
                {
                  footerMenu,
                  footerThin,
                },
                groupId
              )
            : null,
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            groupId
          ),
        };
      },
    },
  },
};

/**
 * Footer (short)
 *
 * @returns {*} CSF story
 */
export const ShortWithAdjunctLegalLinks = ({ parameters }) => {
  const massagedParameters = {
    ...parameters,
    props: {
      Footer: {
        ...(parameters?.props?.Footer ?? {}),
        type: 'short',
        adjunctLinks: [
          {
            title: 'Read the updated Terms of Use.',
            url: 'https://www.example.com',
          },
          {
            title: 'Read Learning Technologies Privacy',
            url: 'https://www.example.com',
          },
        ],
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default parameters={massagedParameters} />
    </div>
  );
};

ShortWithAdjunctLegalLinks.story = {
  name: 'Short with adjunct legal links',
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const isCustom = boolean(
          'show custom navigation (not a prop)',
          inPercy(),
          groupId
        );
        return {
          isCustom,
          navigation: isCustom
            ? object(
                'custom navigation data (navigation)',
                {
                  footerMenu,
                  footerThin,
                },
                groupId
              )
            : null,
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            groupId
          ),
        };
      },
    },
  },
};

/**
 * Footer (short language only)
 *
 * @returns {*} CSF story
 */
export const ShortLanguageOnly = ({ parameters }) => {
  const massagedParameters = {
    ...parameters,
    props: {
      Footer: {
        ...(parameters?.props?.Footer ?? {}),
        type: 'short',
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default parameters={massagedParameters} />
    </div>
  );
};

ShortLanguageOnly.story = {
  name: 'Short language only',
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const isCustom = boolean(
          'show custom navigation (not a prop)',
          inPercy(),
          groupId
        );
        const languageOnly = true;

        return {
          isCustom,
          languageOnly,
          items: !languageOnly
            ? undefined
            : object(
                'language dropdown items (languageItems)',
                languageItems,
                groupId
              ),
          languageInitialItem: { id: 'en', text: 'English' },
          navigation: isCustom
            ? object(
                'custom navigation data (navigation)',
                {
                  footerMenu,
                  footerThin,
                },
                groupId
              )
            : null,
        };
      },
    },
  },
};

/**
 * Footer (micro)
 *
 * @returns {*} CSF story
 */
export const Micro = ({ parameters }) => {
  const massagedParameters = {
    ...parameters,
    props: {
      Footer: {
        ...(parameters?.props?.Footer ?? {}),
        type: 'micro',
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default parameters={massagedParameters} />
    </div>
  );
};

Micro.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        return {
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            groupId
          ),
          languageInitialItem: { id: 'en', text: 'English' },
          adjunctLinks: false,
        };
      },
    },
  },
};

/**
 * Footer (micro language only)
 *
 * @returns {*} CSF story
 */
export const MicroLanguageOnly = ({ parameters }) => {
  const massagedParameters = {
    ...parameters,
    props: {
      Footer: {
        ...(parameters?.props?.Footer ?? {}),
        type: 'micro',
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default parameters={massagedParameters} />
    </div>
  );
};

MicroLanguageOnly.story = {
  name: 'Micro language only',
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const languageOnly = true;

        return {
          languageOnly,
          items: !languageOnly
            ? undefined
            : object(
                'language dropdown items (languageItems)',
                languageItems,
                groupId
              ),
          languageInitialItem: { id: 'en', text: 'English' },
        };
      },
    },
  },
};
