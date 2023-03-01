/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../callout-with-media';
import '../callout-with-media-image';
import '../callout-with-media-video';

const template = (props?) => {
  const { heading, children } = props ?? {};
  return html`
    <dds-callout-with-media>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${children}
    </dds-callout-with-media>
  `;
};

describe('dds-callout-with-media', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-callout-with-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with image attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          children: html`
            <dds-callout-with-media-copy>copy-foo</dds-callout-with-media-copy>
            <dds-callout-with-media-image
              alt="Image alt text"
              default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
              heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
            </dds-callout-with-media-image>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-callout-with-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with video attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          children: html`
            <dds-callout-with-media-copy>copy-foo</dds-callout-with-media-copy>
            <dds-callout-with-media-video
              video-id="0_uka1msg4"></dds-callout-with-media-video>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-callout-with-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
