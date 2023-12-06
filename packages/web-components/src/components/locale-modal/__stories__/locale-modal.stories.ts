/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import inPercy from '@percy-io/in-percy';
import { ifDefined } from 'lit/directives/if-defined.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import localeData from './locale-data.json';
import styles from './locale-modal.stories.scss';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { langDisplay, localeList } = args?.LocaleModalComposite;
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-locale-modal-composite
            lang-display="${ifDefined(langDisplay)}"
            open
            .localeList="${ifDefined(localeList)}">
          </c4d-locale-modal-composite>
        `
      : html`
          <c4d-locale-modal-container
            lang-display="${ifDefined(langDisplay)}"
            open
            .localeList="${ifDefined(localeList)}">
          </c4d-locale-modal-container>
        `}
  `;
};

export default {
  title: 'Components/Locale modal',
  parameters: {
    ...readme.parameters,
    ...(() => {
      // Lets `<c4d-footer-container>` load the locale list
      const useMock =
        inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        knobs: {
          LocaleModalComposite: () => ({
            langDisplay: textNullable(
              'Display language (lang-display)',
              !useMock ? '' : 'United States — English'
            ),
          }),
        },
        props: {
          LocaleModalComposite: {
            localeList: !useMock ? undefined : localeData,
          },
          Other: {
            useMock,
          },
        },
      };
    })(),
    propsSet: {
      default: {
        LocaleModalComposite: {
          langDisplay: 'United States — English',
          localList: localeData,
        },
      },
    },
  },
};
