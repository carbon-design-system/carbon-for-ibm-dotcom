/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Action, Reducer } from 'redux';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import inPercy from '@percy-io/in-percy';
import { FOOTER_SIZE } from '../footer';
import '../footer-composite';
import { reducers, store } from '../footer-container';
import styles from './footer.stories.scss';
import mockLinks from './links';
import mockLegalLinks from './legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import readme from './README.stories.mdx';

store.replaceReducer(reducers as Reducer<unknown, Action<any>>);

export const Default = ({ parameters }) => {
  const { langDisplay, language, size, legalLinks, links, localeList } = parameters?.props?.['dds-footer-composite'] ?? {};
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
            .legalLinks="${ifNonNull(legalLinks)}"
            .links="${ifNonNull(links)}"
            .localeList="${ifNonNull(localeList)}"
          >
          </dds-footer-composite>
        `
      : html`
          <dds-footer-container
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            size="${ifNonNull(size)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .links="${ifNonNull(links)}"
            .localeList="${ifNonNull(localeList)}"
          >
          </dds-footer-container>
        `}
  `;
};

export const short = ({ parameters }) => {
  const { props = {} } = parameters;
  props['dds-footer-composite'] = {
    ...(props['dds-footer-composite'] || {}),
    size: FOOTER_SIZE.SHORT,
  };
  return Default({ parameters });
};

export default {
  title: 'Components/Footer',
  parameters: {
    ...readme.parameters,
    props: (() => {
      // Lets `<dds-footer-container>` load the footer links if `CORS_PROXY` is set
      const useMock = !process.env.CORS_PROXY || inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        'dds-footer-composite': {
          langDisplay: 'English - United States',
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
};
