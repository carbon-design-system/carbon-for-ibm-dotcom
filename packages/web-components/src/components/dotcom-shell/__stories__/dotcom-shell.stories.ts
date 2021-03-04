/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../../masthead/left-nav';
import '../dotcom-shell-container';
import { authenticatedProfileItems, unauthenticatedProfileItems } from '../../masthead/__stories__/profile-items';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss';
import { FOOTER_SIZE } from '../../footer/footer';
import mastheadLinks from '../../masthead/__stories__/links';
import mockFooterLinks from '../../footer/__stories__/links';
import mockLegalLinks from '../../footer/__stories__/legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../../content-block/content-block-copy';
import '../../content-item-horizontal/content-item-horizontal';
import '../../content-item-horizontal/content-item-horizontal-copy';
import '../../content-item-horizontal/content-item-horizontal-eyebrow';
import '../../leadspace-block/leadspace-block';
import '../../leadspace-block/leadspace-block-content';
import '../../leadspace-block/leadspace-block-cta';
import '../../leadspace-block/leadspace-block-heading';
import '../../leadspace-block/leadspace-block-media';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../../quote/quote';
import '../../quote/quote-source-bottom-copy';
import '../../quote/quote-source-copy';
import '../../quote/quote-source-heading';
import readme from './README.stories.mdx';
import StoryContent from './data/content';

const footerSizes = {
  Default: FOOTER_SIZE.REGULAR,
  [`Short (${FOOTER_SIZE.SHORT})`]: FOOTER_SIZE.SHORT,
};

export const Default = ({ parameters }) => {
  const { platform, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, size: footerSize, legalLinks, links: footerLinks, localeList } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            platform="${ifNonNull(platform)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            platform="${ifNonNull(platform)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export default {
  title: 'Components/Dotcom shell',
  decorators: [
    story => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('dds-left-nav');
          if (leftNav) {
            (leftNav as DDSLeftNav).expanded = false;
          }
        });
      }
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        platform: textNullable('Platform (platform)', '', groupId),
        logoHref: 'https://www.ibm.com',
      }),
      FooterComposite: ({ groupId }) => ({
        footerSize: select('Size (footer-size)', footerSizes, null, groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links and lets `<dds-footer-container>` load the footer links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        MastheadComposite: {
          navLinks: !useMock ? undefined : mastheadLinks,
        },
        FooterComposite: {
          langDisplay: !useMock ? undefined : 'United States - English',
          legalLinks: !useMock ? undefined : mockLegalLinks,
          links: !useMock ? undefined : mockFooterLinks,
          localeList: !useMock ? undefined : mockLocaleList,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
