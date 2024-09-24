/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../logo-grid';
import '../../content-block/content-block-heading';
import '../logo-grid-item';
import '../logo-grid-link';
import '../../card-link/card-link-heading';
import '../../card/card-footer';
import { boolean, text, select } from '@storybook/addon-knobs';
import { html } from 'lit';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import logos from './data/logos.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = (args) => {
  const {
    heading,
    logoCount,
    logoRatio,
    logosGroup,
    hideBorder,
    showCta,
    ctaCopy,
    ctaHref,
  } = args?.LogoGrid ?? {};

  return html`
    <c4d-logo-grid
      ?hide-border="${hideBorder}"
      logo-count="${logoCount}"
      logo-ratio="${logoRatio}">
      <c4d-content-block-heading> ${heading} </c4d-content-block-heading>
      ${logosGroup &&
      logosGroup.map(
        (elem) => html`
          <c4d-logo-grid-item
            default-src="${elem.imgSrc}"
            alt="${elem.altText}"></c4d-logo-grid-item>
        `
      )}
      ${showCta
        ? html`
            <c4d-logo-grid-link href="${ctaHref}">
              <c4d-card-link-heading>${ctaCopy}</c4d-card-link-heading>
              <c4d-card-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-card-footer>
            </c4d-logo-grid-link>
          `
        : ''}
    </c4d-logo-grid>
  `;
};

export default {
  title: 'Components/Logo grid',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--col-md-8 cds--col-lg-12">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LogoGrid: () => ({
        heading: textNullable('Heading (heading)', 'Our customers'),
        logoCount: select(
          'Column count (logoCount)',
          { 'Default (3)': '3', '4': '4' },
          '3'
        ),
        logoRatio: select(
          'Logo aspect ratio (logoRatio)',
          { 'Default (4:3)': '4:3', '16:9': '16:9', '2:1': '2:1' },
          '4:3'
        ),
        logosGroup: logos,
        hideBorder: boolean(
          'Hide border (hideBorder): Hide the bottom border',
          false
        ),
        showCta: boolean('Display CTA:', false),
        ctaCopy: text('CTA Copy (ctaCopy)', 'Lorem ipsum dolor sit amet'),
        ctaHref: text('CTA Href (ctaHref):', 'http://local.url.com/'),
      }),
    },
    propsSet: {
      default: {
        LogoGrid: {
          heading: 'Our customers',
          logoCount: '3',
          logoRatio: '4:3',
          logosGroup: logos,
          hideBorder: false,
          showCta: false,
          ctaCopy: 'Lorem ipsum dolor sit amet',
          ctaHref: 'http://local.url.com',
        },
      },
    },
  },
};
