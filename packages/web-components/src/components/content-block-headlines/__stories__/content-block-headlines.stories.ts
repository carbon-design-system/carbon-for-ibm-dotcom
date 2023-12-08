/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const contentItemRow1 = html`
  <c4d-content-block-headlines-item>
    <c4d-content-block-headlines-heading
      >25%</c4d-content-block-headlines-heading
    >
    <c4d-content-item-copy slot="copy"
      >Modernize mission-critical applications and infrastructure in a hybrid
      multicloud environment up to 25 percent faster.</c4d-content-item-copy
    >
    <c4d-link-list slot="footer" type="vertical">
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </c4d-link-list-item-cta>
    </c4d-link-list>
  </c4d-content-block-headlines-item>
`;

const contentItemRow2 = html`
  <c4d-content-block-headlines-item>
    <c4d-content-block-headlines-heading
      >1.34M</c4d-content-block-headlines-heading
    >
    <c4d-content-item-copy slot="copy"
      >Save 1.34M per year by optimizing your time and IT
      expenses.</c4d-content-item-copy
    >
    <c4d-link-list slot="footer" type="vertical">
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </c4d-link-list-item-cta>
    </c4d-link-list>
  </c4d-content-block-headlines-item>
`;

export const Default = (args) => {
  const { heading, copy } = args?.ContentBlockHeadlines ?? {};
  return html`
    <div class="cds--grid">
      <div class="cds--row">
        <div class="cds--col-lg-12 cds--no-gutter">
          <c4d-content-block-headlines>
            <c4d-content-block-heading>${heading}</c4d-content-block-heading>
            <c4d-content-block-copy>${copy}</c4d-content-block-copy>
            ${contentItemRow1} ${contentItemRow1} ${contentItemRow2}
            ${contentItemRow1}
          </c4d-content-block-headlines>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: '',
  decorators: [
    (story) => html`
      <div
        class="c4d-ce-demo-devenv--simple-grid c4d-ce-demo-devenv--simple-grid--content-block-headlines">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    percy: {
      skip: true,
    },
    knobs: {
      ContentBlockHeadlines: () => ({
        heading: textNullable('Heading (required)', 'Aliquam condimentum'),
        copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
              Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
              nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`,
      }),
    },
    propsSet: {
      default: {
        ContentBlockHeadlines: {
          heading: 'Aliquam condimentum',
          copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
              Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
              nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`,
        },
      },
    },
  },
};
