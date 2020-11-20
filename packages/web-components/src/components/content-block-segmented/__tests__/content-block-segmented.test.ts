/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../content-block-segmented';
import '../content-block-segmented-item';

const image = html`
  <dds-image-with-caption
    slot="media"
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="Mauris iaculis eget dolor nec hendrerit."
  >
  </dds-image-with-caption>
`;

const video = html`
  <dds-video-player-container slot="media" video-id="0_uka1msg4"></dds-video-player-container>
`;

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-block-segmented>
      <dds-content-block-heading>heading-foo</dds-content-block-heading>
      <dds-content-block-copy slot="copy">copy-foo</dds-content-block-copy>
      ${children}
    </dds-content-block-segmented>
  `;
};

describe('dds-content-block-segmented', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-block-segmented')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          children: html`
            ${image}
            <dds-content-block-segmented-item>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-item-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum
                sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim
                sapien.</dds-content-item-copy
              >
              <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
                >Lorem Ipsum dolor sit</dds-text-cta
              >
            </dds-content-block-segmented-item>
            <dds-content-block-segmented-item>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-item-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum
                sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim
                sapien.</dds-content-item-copy
              >
              ${image}
              <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
                >Lorem Ipsum dolor sit</dds-text-cta
              >
            </dds-content-block-segmented-item>
            <dds-card-cta slot="cta" cta-type="local" href="https://example.com">
              Lorem ipsum dolor
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-block-segmented')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with video attributes', async function() {
      render(
        template({
          children: html`
            ${video}
            <dds-content-block-segmented-item>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-item-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum
                sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim
                sapien.</dds-content-item-copy
              >
              <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
                >Lorem Ipsum dolor sit</dds-text-cta
              >
            </dds-content-block-segmented-item>
            <dds-content-block-segmented-item>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-item-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum
                sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim
                sapien.</dds-content-item-copy
              >
              ${image}
              <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
                >Lorem Ipsum dolor sit</dds-text-cta
              >
            </dds-content-block-segmented-item>
            <dds-card-cta slot="cta" cta-type="local" href="https://example.com">
              Lorem ipsum dolor
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-block-segmented')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with aside element attributes', async function() {
      render(
        template({
          children: html`
            ${image}
            <dds-content-block-segmented-item>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-item-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum
                sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim
                sapien.</dds-content-item-copy
              >
              <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
                >Lorem Ipsum dolor sit</dds-text-cta
              >
            </dds-content-block-segmented-item>
            <dds-content-block-segmented-item>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-item-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam.
                In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut
                quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum
                sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim
                sapien.</dds-content-item-copy
              >
              ${image}
              <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
                >Lorem Ipsum dolor sit</dds-text-cta
              >
            </dds-content-block-segmented-item>
            <dds-content-block-complementary>
              <dds-link-list type="default">
                <span slot="heading">Tutorials</span>
                <dds-link-list-item-card-cta href="https://example.com" cta-type="local">
                  <p>Containerization A Complete Guide</p>
                  <dds-card-cta-footer></dds-card-cta-footer>
                </dds-link-list-item-card-cta>
                <dds-link-list-item-card-cta href="https://example.com" cta-type="external">
                  <p>Why should you use microservices and containers</p>
                  <dds-card-cta-footer></dds-card-cta-footer>
                </dds-link-list-item-card-cta>
              </dds-link-list>
            </dds-content-block-complementary>
            <dds-card-cta slot="cta" cta-type="local" href="https://example.com">
              Lorem ipsum dolor
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-block-segmented')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
