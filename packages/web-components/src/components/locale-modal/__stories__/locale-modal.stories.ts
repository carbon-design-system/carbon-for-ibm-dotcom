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
import inPercy from '@percy-io/in-percy';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { reducers, store } from '../locale-modal-container';
import localeData from './locale-data.json';
import styles from './locale-modal.stories.scss';
import readme from './README.stories.mdx';

store.replaceReducer(reducers as Reducer<unknown, Action<any>>);

export const Default = ({ parameters }) => {
  const { langDisplay, localeList } = parameters?.props?.['dds-locale-modal-container'];
  return html`
    <style>
      ${styles}
    </style>
    <dds-locale-modal-container lang-display="${ifNonNull(langDisplay)}" open .localeList="${ifNonNull(localeList)}">
    </dds-locale-modal-container>
  `;
};

export default {
  title: 'Components/Locale modal',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-locale-modal-container': ({ groupId }) => ({
        langDisplay: textNullable(
          'Display language (lang-display)',
          process.env.CORS_PROXY && !inPercy() ? '' : 'United States — English',
          groupId
        ),
      }),
    },
    props: {
      'dds-locale-modal-container': {
        // Lets `<dds-locale-modal-container>` load the nav links if `CORS_PROXY` is set
        localeList: process.env.CORS_PROXY && !inPercy() ? undefined : localeData,
      },
    },
  },
};
