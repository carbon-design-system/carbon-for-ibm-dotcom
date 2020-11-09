/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-complementary';
import '../../content-item-horizontal/content-item-horizontal';
import '../content-group-horizontal';

const copy =
  'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
  'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
  'Phasellus at elit sollicitudin.';

const linkListItem = html`
  <dds-content-item-horizontal .copy=${copy}>
    <slot slot="eyebrow">Lorem ipsum</slot>
    <dds-content-item-heading>Aliquam condimentum</dds-content-item-heading>
    <dds-link-list slot="cta" type="vertical">
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </dds-link-list-item-cta>
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </dds-link-list-item-cta>
    </dds-link-list>
  </dds-content-item-horizontal>
`;

export const Default = ({ parameters }) => {
  const { heading } = parameters?.props?.ContentGroupHorizontal ?? {};
  return html`
    <dds-content-group-horizontal>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${linkListItem} ${linkListItem} ${linkListItem}
    </dds-content-group-horizontal>
  `;
};

export default {
  title: 'Components/Content Group Horizontal',
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
      ContentGroupHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
      }),
    },
  },
};
