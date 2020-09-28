/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
    />
  );
};

Default.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        /**
         * Language callback demo function
         *
         * @param {string} selectedItem Selected item
         */
        const languageCallback = selectedItem => {
          console.log(
            'footer (language selector) selected item:',
            selectedItem
          );
        };

        return {
          languageInitialItem: { id: 'en', text: 'English' },
          languageCallback,
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

  return <Default parameters={massagedParameters} />;
};

DefaultLanguageOnly.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const languageOnly = true;

        /**
         * Language callback demo function
         *
         * @param {string} selectedItem Selected item
         */
        const languageCallback = selectedItem => {
          console.log(
            'footer (language selector) selected item:',
            selectedItem
          );
        };

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
          languageCallback,
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

  return <Default parameters={massagedParameters} />;
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

  return <Default parameters={massagedParameters} />;
};

ShortLanguageOnly.story = {
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

  return <Default parameters={massagedParameters} />;
};

Micro.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        /**
         * Language callback demo function
         *
         * @param {string} selectedItem Selected item
         */
        const languageCallback = selectedItem => {
          console.log(
            'footer (language selector) selected item:',
            selectedItem
          );
        };

        return {
          disableLocaleButton: boolean(
            'hide the locale button (disableLocaleButton)',
            false,
            groupId
          ),
          languageInitialItem: { id: 'en', text: 'English' },
          languageCallback,
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

  return <Default parameters={massagedParameters} />;
};

MicroLanguageOnly.story = {
  parameters: {
    knobs: {
      Footer: ({ groupId }) => {
        const languageOnly = true;

        /**
         * Language callback demo function
         *
         * @param {string} selectedItem Selected item
         */
        const languageCallback = selectedItem => {
          console.log(
            'footer (language selector) selected item:',
            selectedItem
          );
        };

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
          languageCallback,
        };
      },
    },
  },
};
