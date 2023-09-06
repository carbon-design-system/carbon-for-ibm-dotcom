/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../content-block-media';
import '../content-block-media-content';
import '../../content-item/content-item';
import '../../content-item/content-item-heading';
import '../../content-item/content-item-copy';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-block-media> ${children} </c4d-content-block-media>
  `;
};

describe('c4d-content-block-media', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <c4d-content-block-heading>
              Curabitur malesuada varius mi eu posuere
            </c4d-content-block-heading>
            <c4d-content-block-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
              ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus
              at elit sollicitudin, sodales nulla quis, consequat libero.
              Phasellus at elit sollicitudin, sodales nulla quis, consequat
              libero.
            </c4d-content-block-paragraph>
            <c4d-content-block-media-content>
              <c4d-content-group-heading>
                Lorem ipsum dolor sit amet
              </c4d-content-group-heading>
              <c4d-image
                slot="media"
                alt="Image alt text"
                default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
                heading="Lorem ipsum">
                <c4d-image-item
                  media="(min-width: 672px)"
                  srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616">
                </c4d-image-item>
                <c4d-image-item
                  media="(min-width: 400px)"
                  srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616">
                </c4d-image-item>
                <c4d-image-item
                  media="(min-width: 320px)"
                  srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616">
                </c4d-image-item>
              </c4d-image>
              <c4d-content-item>
                <c4d-content-item-heading
                  >Lorem ipsum dolor sit amet.</c4d-content-item-heading
                >
                <c4d-content-item-copy>
                  Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
                  Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                  quam id mauris finibus efficitur quis ut arcu. Praesent purus
                  turpis, venenatis eget odio et, tincidunt bibendum sem.
                  Curabitur pretium elit non blandit lobortis. Donec quis
                  pretium odio, in dignissim sapien.
                </c4d-content-item-copy>
              </c4d-content-item>
              <c4d-card-link slot="footer" href="https://example.com">
                <p>Lorem ipsum dolor sit amet</p>
                <c4d-card-footer></c4d-card-footer>
              </c4d-card-link>
            </c4d-content-block-media-content>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<c4d-content-block-media>`
      expect(
        document.body.querySelector('c4d-content-block-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
