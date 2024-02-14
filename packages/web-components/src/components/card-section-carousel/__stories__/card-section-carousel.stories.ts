/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import '../index';
import styles from './card-section-carousel.stories.scss?lit';
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
  <c4d-card href="${ifDefined(href)}">
    <c4d-card-heading>${heading}</c4d-card-heading>
    <p>${copy}</p>
    <c4d-card-footer> ${ArrowRight20({ slot: 'icon' })} </c4d-card-footer>
  </c4d-card>
`;

export const Default = () => {
  return html`
    <c4d-card-section-carousel>
      <c4d-content-section-heading
        >Lorem ipsum dolor sit amet</c4d-content-section-heading
      >
      <c4d-content-section-copy
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.
      </c4d-content-section-copy>
      <c4d-link-with-icon slot="footer" href="${ifDefined(hrefDefault)}">
        Link text ${ArrowRight20({ slot: 'icon' })}
      </c4d-link-with-icon>
      <c4d-carousel>
        ${Card()}${Card({ copy: copyOdd })}${Card()}${Card({
          copy: copyOdd,
        })}${Card()}
      </c4d-carousel>
    </c4d-card-section-carousel>
  `;
};

export default {
  title: 'Components/Card section carousel',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="cds--grid">
        <div class="cds--row grid-alignment">${story()}</div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
