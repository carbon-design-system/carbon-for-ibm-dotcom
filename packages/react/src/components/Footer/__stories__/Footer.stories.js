/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object } from '@storybook/addon-knobs';
import { DDS_LANGUAGE_SELECTOR } from '../../../internal/FeatureFlags';
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
        const languageOnly =
          DDS_LANGUAGE_SELECTOR &&
          boolean(
            'switch to the language selector (languageOnly)',
            false,
            groupId
          );

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

        const knobs = Short.story.parameters.knobs.Footer({ groupId });

        return {
          ...knobs,
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
