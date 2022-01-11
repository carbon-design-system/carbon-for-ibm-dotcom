/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
import { DDS_CONTENT_BLOCK_HEADLINES } from '../../../globals/internal/feature-flags';

const contentItemRow1 = html`
  <dds-content-block-headlines-item>
    <dds-content-block-headlines-heading>25%</dds-content-block-headlines-heading>
    <dds-content-item-copy slot="copy"
      >Modernize mission-critical applications and infrastructure in a hybrid multicloud environment up to 25 percent
      faster.</dds-content-item-copy
    >
    <dds-link-list slot="footer" type="vertical">
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </dds-link-list-item-cta>
    </dds-link-list>
  </dds-content-block-headlines-item>
`;

const contentItemRow2 = html`
  <dds-content-block-headlines-item>
    <dds-content-block-headlines-heading>1.34M</dds-content-block-headlines-heading>
    <dds-content-item-copy slot="copy">Save 1.34M per year by optimizing your time and IT expenses.</dds-content-item-copy>
    <dds-link-list slot="footer" type="vertical">
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </dds-link-list-item-cta>
    </dds-link-list>
  </dds-content-block-headlines-item>
`;

export const Default = !DDS_CONTENT_BLOCK_HEADLINES
  ? undefined
  : ({ parameters }) => {
      const { heading, copy } = parameters?.props?.ContentBlockHeadlines ?? {};
      return html`
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col-lg-12 bx--no-gutter">
              <dds-content-block-headlines>
                <dds-content-block-heading>${heading}</dds-content-block-heading>
                <dds-content-block-copy>${copy}</dds-content-block-copy>
                ${contentItemRow1} ${contentItemRow1} ${contentItemRow2} ${contentItemRow1}
              </dds-content-block-headlines>
            </div>
          </div>
        </div>
      `;
    };

export default !DDS_CONTENT_BLOCK_HEADLINES
  ? undefined
  : {
      title: 'Components/Content block headlines',
      decorators: [
        story => html`
          <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-block-headlines">
            ${story()}
          </div>
        `,
      ],
      parameters: {
        ...readme.parameters,
        hasStoryPadding: true,
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
