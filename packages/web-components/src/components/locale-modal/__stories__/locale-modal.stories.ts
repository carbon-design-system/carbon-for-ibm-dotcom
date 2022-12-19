/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import inPercy from '@percy-io/in-percy';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
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
          <dds-locale-modal-composite
            lang-display="${ifNonNull(langDisplay)}"
            open
            .localeList="${ifNonNull(localeList)}">
          </dds-locale-modal-composite>
        `
      : html`
          <dds-locale-modal-container
            lang-display="${ifNonNull(langDisplay)}"
            open
            .localeList="${ifNonNull(localeList)}">
          </dds-locale-modal-container>
        `}
  `;
};

export default {
  title: 'Components/Locale modal',
  component: 'dds-locale-modal',
  argTypes: {
    'lang-display': {
      control: 'text',
      defaultValue: 'United States — English',
    },
    'close-button-assistive-text': {
      table: {
        disable: true,
      },
    },
    'dds-expressive-modal-beingclosed': {
      table: {
        disable: true,
      },
    },
    'dds-expressive-modal-closed': {
      table: {
        disable: true,
      },
    },
    'header-title': {
      table: {
        disable: true,
      },
    },
    'container-class': {
      table: {
        disable: true,
      },
    },
    'expressive-size': {
      table: {
        disable: true,
      },
    },
    open: {
      table: {
        disable: true,
      },
    },
    mode: {
      table: {
        disable: true,
      },
    },
    closeButtonAssistiveText: {
      table: {
        disable: true,
      },
    },
    headerTitle: {
      table: {
        disable: true,
      },
    },
    langDisplay: {
      table: {
        disable: true,
      },
    },
    hasFocusableElements: {
      table: {
        disable: true,
      },
    },
    focusableElements: {
      table: {
        disable: true,
      },
    },
    modalContent: {
      table: {
        disable: true,
      },
    },
    modalBody: {
      table: {
        disable: true,
      },
    },
    containerClass: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    'regions-selector': {
      table: {
        disable: true,
      },
    },
    'locales-selector': {
      table: {
        disable: true,
      },
    },
    header: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    ...(() => {
      // Lets `<dds-footer-container>` load the locale list
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
