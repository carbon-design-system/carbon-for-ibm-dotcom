/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../content-block-media';
import '../content-block-media-content';
import '../../content-item/content-item';
import '../../content-item/content-item-heading';
import '../../content-item/content-item-copy';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-block-media> ${children} </dds-content-block-media>
  `;
};

describe('dds-content-block-media', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <dds-content-block-heading>
              Curabitur malesuada varius mi eu posuere
            </dds-content-block-heading>
            <dds-content-block-paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
              ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus
              at elit sollicitudin, sodales nulla quis, consequat libero.
              Phasellus at elit sollicitudin, sodales nulla quis, consequat
              libero.
            </dds-content-block-paragraph>
            <dds-content-block-media-content>
              <dds-content-group-heading>
                Lorem ipsum dolor sit amet
              </dds-content-group-heading>
              <dds-image
                slot="media"
                alt="Image alt text"
                default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
                heading="Lorem ipsum">
                <dds-image-item
                  media="(min-width: 672px)"
                  srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616">
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 400px)"
                  srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616">
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 320px)"
                  srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616">
                </dds-image-item>
              </dds-image>
              <dds-content-item>
                <dds-content-item-heading
                  >Lorem ipsum dolor sit amet.</dds-content-item-heading
                >
                <dds-content-item-copy>
                  Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
                  Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                  quam id mauris finibus efficitur quis ut arcu. Praesent purus
                  turpis, venenatis eget odio et, tincidunt bibendum sem.
                  Curabitur pretium elit non blandit lobortis. Donec quis
                  pretium odio, in dignissim sapien.
                </dds-content-item-copy>
              </dds-content-item>
              <dds-card-link slot="footer" href="https://example.com">
                <p>Lorem ipsum dolor sit amet</p>
                <dds-card-footer></dds-card-footer>
              </dds-card-link>
            </dds-content-block-media-content>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-content-block-media>`
      expect(
        document.body.querySelector('dds-content-block-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
