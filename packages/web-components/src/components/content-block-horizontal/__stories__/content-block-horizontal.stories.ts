/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const copy =
  'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
  'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
  'Phasellus at elit sollicitudin.';

const linkListItem = html`
  <c4d-content-item-row>
    <c4d-content-item-row-eyebrow>Lorem ipsum</c4d-content-item-row-eyebrow>
    <c4d-content-item-heading>Aliquam condimentum</c4d-content-item-heading>
    <c4d-content-item-row-copy>${copy}</c4d-content-item-row-copy>
    <c4d-link-list slot="footer" type="vertical">
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </c4d-link-list-item-cta>
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="external">
        External link text
      </c4d-link-list-item-cta>
    </c4d-link-list>
  </c4d-content-item-row>
`;

export const Default = (args) => {
  const { heading, border } = args?.ContentBlockHorizontal ?? {};

  return html`
    <c4d-content-block-horizontal ?border=${border}>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      ${linkListItem} ${linkListItem} ${linkListItem}
    </c4d-content-block-horizontal>
  `;
};

export default {
  title: 'Components/Content block horizontal',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlockHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        border: boolean('Bottom Border (border):', true),
      }),
    },
    propsSet: {
      default: {
        ContentBlockHorizontal: {
          heading: 'Aliquam condimentum',
          border: true,
        },
      },
    },
  },
};
