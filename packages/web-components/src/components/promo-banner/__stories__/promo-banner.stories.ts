/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '../index';
import '@carbon/ibmdotcom-web-components/es/components/cta/index';
import '@carbon/ibmdotcom-web-components/es/components/image/index';
import '@carbon/ibmdotcom-web-components/es/components/table-of-contents/index';
import { types } from '@carbon/ibmdotcom-web-components/es/component-mixins/cta/cta';

import readme from './README.stories.mdx';

const incompatibleTypes = ['video', 'email', 'schedule', 'chat', 'call'];
const ctaTypes = Object.values(types).filter(
  (val) => !!val && !incompatibleTypes.includes(val)
);

export default {
  title: 'Components/Promo Banner',
  parameters: {
    ...readme.parameters,
  },
  argTypes: {
    heading: {
      control: { type: 'text' },
      name: 'Heading (HTML Enabled)',
      defaultValue:
        '<h5>Try a demo of Watson<span style="color:#0f62fe;">X</span></h5>',
    },
    body: {
      control: { type: 'text' },
      name: 'Body Text (HTML Enabled)',
      defaultValue: '<p>Easily deploy and embed AI across your business.</p>',
    },
    cta: {
      control: { type: 'text' },
      name: 'CTA Label',
      defaultValue: 'Try Today',
    },
    ctaType: {
      control: { type: 'select' },
      options: ctaTypes,
      name: 'CTA Type',
      defaultValue: 'local',
    },
    tocLayout: {
      control: { type: 'boolean' },
      name: 'Render in TOC',
      defaultValue: false,
    },
    hasImage: {
      control: { type: 'boolean' },
      name: 'Has Image',
      defaultValue: true,
      if: { arg: 'tocLayout', truthy: false },
    },
  },
  decorators: [
    (story, { args: { tocLayout } }) => html`
      <div class="c4d-story-padding">
        ${tocLayout
          ? html`
              <c4d-table-of-contents class="cds--grid">
                <div class="cds--row">
                  <div class="cds--col cds--no-gutter">
                    <div name="TOC Label" data-title="Promotional Banner">
                      ${story()}
                    </div>
                  </div>
                </div>
              </c4d-table-of-contents>
            `
          : html`
              <div class="cds--grid">
                <div class="cds--row">
                  <div class="cds--col cds--no-gutter">${story()}</div>
                </div>
              </div>
            `}
      </div>
    `,
  ],
};

const Template = (args) => {
  const { heading, body, hasImage, cta, ctaType } = args;

  return html`
    <c4d-promo-banner>
      ${hasImage !== false // Need explicit check to test image container queries.
        ? html`
            <c4d-image
              alt="Image alt text"
              slot="image"
              width="300"
              height="300"
              default-src="https://fpoimg.com/300x300?&bg_color=5396ee&text_color=161616">
              <c4d-image-item
                media="(min-width:1584px)"
                srcset="https://fpoimg.com/600x600?&bg_color=ee5396&text_color=161616"></c4d-image-item>
              <c4d-image-item
                media="(min-width:1312px)"
                srcset="https://fpoimg.com/400x400?&bg_color=53ee96&text_color=161616"></c4d-image-item>
            </c4d-image>
          `
        : ''}
      ${unsafeHTML(heading)} ${unsafeHTML(body)}
      ${cta
        ? html`
            <c4d-button-cta
              cta-type="${ctaType}"
              kind="tertiary"
              slot="cta"
              href="https://example.com"
              >${cta}</c4d-button-cta
            >
          `
        : ''}
    </c4d-promo-banner>
  `;
};

export const Default = (_args) => Template(_args);
