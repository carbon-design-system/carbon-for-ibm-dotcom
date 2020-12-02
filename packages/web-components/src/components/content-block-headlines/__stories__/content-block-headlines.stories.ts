/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
// import { select } from '@storybook/addon-knobs';
// import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
// import '../../content-block/content-block-heading';
// import '../../content-block/content-block-copy';
// import '../../content-block/content-block-complementary';
import '../../content-item-horizontal/content-item-horizontal';
import '../../content-item-horizontal/content-item-horizontal-copy';
import '../content-block-headlines';
import '../content-block-headlines-item';
// import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';

const contentItemRow1 = html`
  <dds-content-block-headlines-item slot="content">
    <dds-content-item-headline slot="headline">25%</dds-content-item-headline>
    <dds-content-item-copy slot="copy"
      >Modernize mission-critical applications and infrastructure in a hybrid multicloud environment up to 25 percent
      faster.</dds-content-item-copy
    >
  </dds-content-block-headlines-item>
`;

const contentItemRow2 = html`
  <dds-content-block-headlines-item slot="content">
    <dds-content-item-headline slot="headline">1.34M</dds-content-item-headline>
    <dds-content-item-copy slot="copy">Save 1.34M per year by optimizing your time and IT expenses.</dds-content-item-copy>
    <dds-link-list slot="cta" type="vertical">
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </dds-link-list-item-cta>
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </dds-link-list-item-cta>
    </dds-link-list>
  </dds-content-block-headlines-item>
`;

export const Default = ({ parameters }) => {
  const { heading, copy } = parameters?.props?.ContentBlockHeadlines ?? {};
  return html`
    <dds-content-block-headlines>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy slot="copy">${copy}</dds-content-block-copy>
      ${contentItemRow1} ${contentItemRow1} ${contentItemRow2}
    </dds-content-block-headlines>
  `;
};

export default {
  title: 'Components/Content Block Headlines',
  decorators: [
    (story, { parameters }) => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class=" bx--col-sm-4 bx--offset-lg-4 ${parameters.gridLargeColumnClass}">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridLargeColumnClass: 'bx--col-lg-12',
    knobs: {
      ContentBlockHeadlines: () => ({
        heading: textNullable('Heading (required)', 'Aliquam condimentum'),
        copy: textNullable(
          'copy',
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
           Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
           nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing
           elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`
        ),
      }),
    },
  },
};
