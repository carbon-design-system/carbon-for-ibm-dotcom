/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../logo-grid';
import '../../content-block/content-block-heading';
import '../logo-grid-item';
import '../logo-grid-link';
import '../../card/card-heading';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import logos from './data/logos.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading, logosGroup, ctaCopy, ctaHref, hideBorder } = parameters?.props?.LogoGrid ?? {};
  return html`
    <dds-logo-grid ?hide-border="${hideBorder}">
      <dds-content-block-heading>
        ${heading}
      </dds-content-block-heading>
      ${logosGroup &&
        logosGroup.map(
          elem => html`
            <dds-logo-grid-item default-src="${elem.imgSrc}" alt="${elem.altText}"></dds-logo-grid-item>
          `
        )}
      <dds-logo-grid-link href="${ctaHref}">
        <dds-card-heading>${ctaCopy}</dds-card-heading>
        ${ArrowRight20({ slot: 'footer' })}
      </dds-logo-grid-link>
    </dds-logo-grid>
  `;
};

export default {
  title: 'Components/Logo Grid',
  decorators: [
    story => html`
      <div style="width: 100%" class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-8 bx--col-lg-12 bx--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      LogoGrid: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Our customers', groupId),
        logosGroup: logos,
        ctaCopy: textNullable('CTA Copy (ctaCopy)', 'Lorem ipsum dolor sit amet', groupId),
        ctaHref: textNullable('CTA Href (ctaHref)', 'http://local.url.com/', groupId),
        hideBorder: boolean('Hide border (hideBorder): Hide the bottom border', false, groupId),
      }),
    },
  },
};
