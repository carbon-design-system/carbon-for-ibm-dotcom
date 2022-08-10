/**
 * Copyright IBM Corp. 2016, 2022
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

const props = {
  default: () => ({
    type: 'default',
    languageInitialItem: { id: 'en', text: 'English' },
    disableLocaleButton: boolean(
      'hide the locale button (disableLocaleButton)',
      false
    ),
  }),
  defaultLanguageOnly: () => {
    const languageOnly = true;
    return {
      type: 'default',
      languageOnly,
      items: !languageOnly
        ? undefined
        : object('language dropdown items (languageItems)', languageItems),
      languageInitialItem: { id: 'en', text: 'English' },
    };
  },
  short: () => {
    const isCustom = boolean('show custom navigation (not a prop)', inPercy());
    return {
      type: 'short',
      isCustom,
      navigation: isCustom
        ? object('custom navigation data (navigation)', {
            footerMenu,
            footerThin,
          })
        : null,
      disableLocaleButton: boolean(
        'hide the locale button (disableLocaleButton)',
        false
      ),
    };
  },
  shortWithAdjunctLegalLinks: () => {
    const isCustom = boolean('show custom navigation (not a prop)', inPercy());
    return {
      isCustom,
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
      navigation: isCustom
        ? object('custom navigation data (navigation)', {
            footerMenu,
            footerThin,
          })
        : null,
      disableLocaleButton: boolean(
        'hide the locale button (disableLocaleButton)',
        false
      ),
    };
  },
  shortLanguageOnly: () => {
    const isCustom = boolean('show custom navigation (not a prop)', inPercy());
    const languageOnly = true;

    return {
      type: 'short',
      isCustom,
      languageOnly,
      items: !languageOnly
        ? undefined
        : object('language dropdown items (languageItems)', languageItems),
      languageInitialItem: { id: 'en', text: 'English' },
      navigation: isCustom
        ? object('custom navigation data (navigation)', {
            footerMenu,
            footerThin,
          })
        : null,
    };
  },
  micro: () => ({
    type: 'micro',
    disableLocaleButton: boolean(
      'hide the locale button (disableLocaleButton)',
      false
    ),
    languageInitialItem: { id: 'en', text: 'English' },
    adjunctLinks: false,
  }),
  microLanugaugeOnly: () => {
    const languageOnly = true;

    return {
      type: 'micro',
      languageOnly,
      items: !languageOnly
        ? undefined
        : object('language dropdown items (languageItems)', languageItems),
      languageInitialItem: { id: 'en', text: 'English' },
    };
  },
};

export default {
  title: 'Components/Footer',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    percy: {
      name: 'Components|Footer: Default',
    },
  },
};

export const Default = args => {
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
  } = { ...(Object.keys(args).length > 0 ? args : props.default()) } ?? {};

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

export const DefaultWithAdjunctLegalLinks = () => {
  const {
    type,
    isCustom,
    navigation,
    disableLocaleButton,
    languageOnly,
    items,
    languageInitialItem,
    languageCallback,
  } = props.default() ?? {};

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
    percy: {
      name: 'Components|Footer: Default with adjunct legal links',
    },
  },
};

export const DefaultLanguageOnly = () => {
  return (
    <div className="default-language-only">
      <Default {...props.defaultLanguageOnly()} />
    </div>
  );
};

DefaultLanguageOnly.story = {
  name: 'Default language only',
  parameters: {
    percy: {
      name: 'Components|Footer: Default language only',
    },
  },
};

/**
 * Footer (short)
 *
 * @returns {*} CSF story
 */
export const Short = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default {...props.short()} />
    </div>
  );
};

ShortWithAdjunctLegalLinks.story = {
  parameters: {
    percy: {
      name: 'Components|Footer: Short',
    },
  },
};

/**
 * Footer (short)
 *
 * @returns {*} CSF story
 */
export const ShortWithAdjunctLegalLinks = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default {...props.shortWithAdjunctLegalLinks()} />
    </div>
  );
};

ShortWithAdjunctLegalLinks.story = {
  name: 'Short with adjunct legal links',
  parameters: {
    percy: {
      name: 'Components|Footer: Short with adjunct legal links',
    },
  },
};

/**
 * Footer (short language only)
 *
 * @returns {*} CSF story
 */
export const ShortLanguageOnly = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default {...props.shortLanguageOnly()} />
    </div>
  );
};

ShortLanguageOnly.story = {
  name: 'Short language only',
  parameters: {
    percy: {
      name: 'Components|Footer: Short language only',
    },
  },
};

/**
 * Footer (micro)
 *
 * @returns {*} CSF story
 */
export const Micro = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default {...props.micro()} />
    </div>
  );
};

Micro.story = {
  parameters: {
    percy: {
      name: 'Components|Footer: Micro',
    },
  },
};

/**
 * Footer (micro language only)
 *
 * @returns {*} CSF story
 */
export const MicroLanguageOnly = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '100%' }}>
      <Default {...props.microLanugaugeOnly()} />
    </div>
  );
};

MicroLanguageOnly.story = {
  name: 'Micro language only',
  parameters: {
    percy: {
      name: 'Components|Footer: Micro language only',
    },
  },
};
