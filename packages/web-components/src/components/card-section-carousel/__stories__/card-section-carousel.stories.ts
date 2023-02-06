/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import '../index';
import styles from './card-section-carousel.stories.scss';
import readme from './README.stories.mdx';

const hrefDefault = 'https://www.ibm.com/standards/carbon';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const Card = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
} = {}) => html`
  <dds-card href="${ifNonNull(href)}">
    <dds-card-heading>${heading}</dds-card-heading>
    ${copy}
    <dds-card-footer> ${ArrowRight20({ slot: 'icon' })} </dds-card-footer>
  </dds-card>
`;

export const Default = () => {
  return html`
    <dds-card-section-carousel>
      <dds-content-section-heading
        >Lorem ipsum dolor sit amet</dds-content-section-heading
      >
      <dds-content-section-copy
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.
      </dds-content-section-copy>
      <dds-link-with-icon slot="footer" href="${ifNonNull(hrefDefault)}">
        Link text ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
      <dds-carousel>
        ${Card()}${Card({ copy: copyOdd })}${Card()}${Card({
          copy: copyOdd,
        })}${Card()}
      </dds-carousel>
    </dds-card-section-carousel>
  `;
};

export default {
  title: 'Components/Card section carousel',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row grid-alignment">${story()}</div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
