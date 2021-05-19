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
import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import logos from './data/logos.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading, logosGroup, hideBorder } = parameters?.props?.LogoGrid ?? {};
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
    </dds-logo-grid>
  `;
};

export default {
  title: 'Components/Logo grid',
  decorators: [
    story => html`
      <div class="bx--grid">
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
    useRawContainer: true,
    knobs: {
      LogoGrid: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Our customers', groupId),
        logosGroup: logos,
        hideBorder: boolean('Hide border (hideBorder): Hide the bottom border', false, groupId),
      }),
    },
  },
};
