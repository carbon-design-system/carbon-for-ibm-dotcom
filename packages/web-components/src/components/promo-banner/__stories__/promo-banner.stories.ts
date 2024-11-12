/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../index';
import '../../cta/index';
import '../../image/index';
import '../../table-of-contents/index';
import { types } from '../../../component-mixins/cta/cta';

import readme from './README.stories.mdx';

const incompatibleTypes = ['video', 'email', 'schedule', 'chat', 'call'];
const ctaTypes = Object.values(types).filter(
  (val) => !!val && !incompatibleTypes.includes(val)
);

export default {
  title: 'Components/Promo Banner',
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      PromoBanner: () => {
        const heading = text(
          'Heading (HTML Enabled)',
          '<h5>Try a demo of Watson<span style="color:#0f62fe;">X</span></h5>'
        );
        const body = text(
          'Body Text (HTML Enabled)',
          '<p>Easily deploy and embed AI across your business.</p>'
        );
        const cta = text('CTA Label', 'Try Today');
        const ctaType = select('CTA Type', ctaTypes, ctaTypes[0]);
        const tocLayout = boolean('Render in TOC', false);
        const hasImage = boolean('Has Image', true);
        return {
          heading,
          body,
          cta,
          ctaType,
          tocLayout,
          hasImage,
        };
      },
    },
  },

  decorators: [
    (story, { args }) => {
      return html`
        <div class="c4d-story-padding">
          ${args?.PromoBanner?.tocLayout
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
      `;
    },
  ],
};

export const Default = (args) => {
  const { heading, body, hasImage, cta, ctaType } = args?.PromoBanner ?? {};
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
