/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import { FOOTER_SIZE } from '../footer';
import '../footer-composite';
import '../footer-container';
import mockLangList from './language-list';
import mockLinks from './links';
import mockLegalLinks from './legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import readme from './README.stories.mdx';
import styles from './footer.stories.scss';

export const base = ({ parameters }) => {
  const { langDisplay, language, size, langList, legalLinks, links, localeList, enableLanguageSelector } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-footer-composite
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            size="${ifNonNull(size)}"
            languageList="${ifNonNull(langList)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .links="${ifNonNull(links)}"
            .localeList="${ifNonNull(localeList)}"
            .enableLanguageSelector="${enableLanguageSelector}"
          >
          </dds-footer-composite>
        `
      : html`
          <dds-footer-container
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            size="${ifNonNull(size)}"
            languageList="${ifNonNull(langList)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .links="${ifNonNull(links)}"
            .localeList="${ifNonNull(localeList)}"
            .enableLanguageSelector="${enableLanguageSelector}"
          >
          </dds-footer-container>
        `}
  `;
};

export const Default = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    enableLanguageSelector: false,
  };
  return base({ parameters });
};

export const defaultLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.REGULAR,
    enableLanguageSelector: true,
  };
  return base({ parameters });
};

export const short = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    enableLanguageSelector: false,
  };
  return base({ parameters });
};

export const shortDefaultLanguageOnly = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.SHORT,
    enableLanguageSelector: true,
  };
  return html`
    <div class="micro-container">
      ${base({ parameters })}
    </div>
  `;
};

export const micro = ({ parameters }) => {
  const { props = {} } = parameters;
  props.FooterComposite = {
    ...(props.FooterComposite || {}),
    size: FOOTER_SIZE.MICRO,
    enableLanguageSelector: false,
  };
  return html`
    <div class="micro-container">
      ${base({ parameters })}
    </div>
  `;
};

export default {
  title: 'Components/Footer',
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    props: (() => {
      // Lets `<dds-footer-container>` load the footer links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        FooterComposite: {
          langDisplay: !useMock ? undefined : 'United States - English',
          langList: !useMock ? undefined : mockLangList,
          legalLinks: !useMock ? undefined : mockLegalLinks,
          links: !useMock ? undefined : mockLinks,
          localeList: !useMock ? undefined : mockLocaleList,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
  excludeStories: ['base'],
};
