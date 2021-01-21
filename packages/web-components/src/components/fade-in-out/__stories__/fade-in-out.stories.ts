/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import fadeStyles from '@carbon/ibmdotcom-styles/scss/components/scroll-into-view/_scroll-into-view.scss';
import DDSLeftNav from '../../masthead/left-nav';
import fadeOptions from './fade-in-out.stories.scss';
import '../../dotcom-shell/dotcom-shell-container';
import '../fade-in-out';
import { authenticatedProfileItems, unauthenticatedProfileItems } from '../../masthead/__stories__/profile-items';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss';
import mastheadLinks from '../../masthead/__stories__/links';
import mockFooterLinks from '../../footer/__stories__/links';
import mockLegalLinks from '../../footer/__stories__/legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import readme from './README.stories.mdx';
import StoryContent from '../../dotcom-shell/__stories__/data/content';

const selectorTargets = `dds-content-block-heading,
   dds-content-block-copy,
   dds-video-player-container,
   dds-link-list,
   dds-leadspace-block-cta,
   dds-content-group-heading,
   dds-content-item-copy,
   dds-text-cta,
   dds-feature-card-block-large,
   dds-image,
   .bx--image__img,
   dds-image-with-caption,
   dds-card-cta,
   dds-callout-with-media,
   dds-content-item-horizontal,
   dds-logo-grid-item,
   .bx--card__CTA,
   dds-card-group-item,
   dds-callout-quote,
   dds-video-player,
   dds-cta-section-copy,
   dds-button-group,
   dds-cta-section-item
`;

export const Default = ({ parameters }) => {
  const { userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props.Other ?? {};

  return html`
    <style>
      ${mastheadStyles}
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            <dds-fade-in-out selector-targets="${selectorTargets}">
              ${StoryContent()}
            </dds-fade-in-out>
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
          >
            <dds-fade-in-out selector-targets="${selectorTargets}">
              ${StoryContent()}
            </dds-fade-in-out>
          </dds-dotcom-shell-container>
        `}
  `;
};

export const withContinuousAnimations = ({ parameters }) => {
  const { userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, legalLinks, links: footerLinks, localeList } = parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            <dds-fade-in-out selector-targets="${selectorTargets}" keep-animation="${true}">
              ${StoryContent()}
            </dds-fade-in-out>
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            user-status="${ifNonNull(userStatus)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
          >
            <dds-fade-in-out selector-targets="${selectorTargets}" keep-animation="${true}">
              ${StoryContent()}
            </dds-fade-in-out>
          </dds-dotcom-shell-container>
        `}
  `;
};

export default {
  title: 'Components/Fade In Out',
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
    percy: {
      skip: true,
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
