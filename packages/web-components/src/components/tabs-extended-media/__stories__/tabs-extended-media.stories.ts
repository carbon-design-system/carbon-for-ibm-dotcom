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
import { boolean, select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import '../../content-item-row/index';
import '../../image/index';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../../content-item-row/defs';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

export const Default = (args) => {
  const { sectionHeading, sectionHeadingText, align, type } =
    args?.TabsExtendedWithMedia ?? {};
  const tabs: any[] = [];

  for (let i = 1; i < 5; i++) {
    tabs.push(html`
      <c4d-tab label="Tab ${i}">
        <c4d-content-item-row-media align="${align}">
          ${type === MEDIA_TYPE.IMAGE
            ? html`
                <c4d-image
                  slot="media"
                  alt="Image alt text"
                  default-src="${imgLg16x9}"></c4d-image>
              `
            : ''}
          ${type === MEDIA_TYPE.VIDEO
            ? html`
                <c4d-content-item-row-media-video
                  video-id="0_ibuqxqbe"></c4d-content-item-row-media-video>
              `
            : ''}
          <c4d-content-item-heading>Tab heading ${i}</c4d-content-item-heading>
          <c4d-content-item-row-media-copy
            >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean
            et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus
            at elit sollicitudin.</c4d-content-item-row-media-copy
          >
          <c4d-link-list slot="footer" type="vertical">
            <c4d-link-list-item-cta
              icon-placement="right"
              href="https://www.ibm.com"
              cta-type="local">
              CTA ${i}
            </c4d-link-list-item-cta>
            <c4d-link-list-item-cta
              icon-placement="right"
              href="https://www.ibm.com"
              cta-type="external">
              Microservices and containers
            </c4d-link-list-item-cta>
          </c4d-link-list>
        </c4d-content-item-row-media>
      </c4d-tab>
    `);
  }

  return html`
    <c4d-tabs-extended-media section-heading=${sectionHeading}>
      <c4d-content-section-heading
        >${ifDefined(sectionHeadingText)}</c4d-content-section-heading
      >
      ${tabs}
    </c4d-tabs-extended-media>
  `;
};

Default.story = {
  parameters: {
    knobs: {
      TabsExtendedWithMedia: () => {
        const sectionHeading = boolean('Section heading', true);
        const sectionHeadingText =
          sectionHeading && textNullable('Heading', 'Section heading');
        return {
          sectionHeading,
          sectionHeadingText,
          align: select('Alignment (align)', mediaAlign, MEDIA_ALIGN.LEFT),
          type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        };
      },
    },
    propsSet: {
      default: {
        TabsExtendedWithMedia: {
          sectionHeading: 'TitleHeading',
          align: 'left',
          type: 'image',
        },
      },
    },
  },
};

export default {
  title: 'Components/Tabs extended - with media',
  decorators: [
    (story, { args }) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div
            class="${args?.TabsExtendedWithMedia?.sectionHeading
              ? `cds--col-lg-16`
              : `cds--col-lg-12`} cds--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {},
  },
};
