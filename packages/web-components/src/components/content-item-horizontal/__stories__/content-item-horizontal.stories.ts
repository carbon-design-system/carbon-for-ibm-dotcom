/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../content-item-horizontal';
import '../content-item-horizontal-copy';
import '../../content-item/content-item-heading';
import '../../link-list/link-list';
import '../../cta/link-list-item-cta';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { CTA_TYPE } from '../../cta/shared-enums';

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } =
    parameters?.props?.ContentItemHorizontal ?? {};
  return html`
    <dds-content-item-horizontal>
      <span slot="eyebrow">${eyebrow}</span>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-horizontal-copy>${copy}</dds-content-item-horizontal-copy>
      <dds-link-list slot="footer" type="vertical">
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href1)}"
          cta-type="${ifNonNull(ctaType1)}"
        >
          ${ctaCopy1}
        </dds-link-list-item-cta>
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href2)}"
          cta-type="${ifNonNull(ctaType2)}"
        >
          ${ctaCopy2}
        </dds-link-list-item-cta>
      </dds-link-list>
    </dds-content-item-horizontal>
  `;
};

export default {
  title: 'Components/Content Item Horizontal',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasVerticalSpacingInComponent: true,
    hasGrid: true,
    knobs: {
      ContentItemHorizontal: () => ({
        eyebrow: textNullable('Eyebrow (eyebrow):', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: textNullable(
          'Copy (copy):',
          'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
            'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin.'
        ),
        ctaType1: select('CTA 1 type (cta-type)', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type)', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
  },
};
