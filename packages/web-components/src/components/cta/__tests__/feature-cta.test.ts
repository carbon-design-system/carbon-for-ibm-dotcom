/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CTA_TYPE } from '../defs';
import '../feature-cta';
import '../../card/card-heading';

const template = (props?) => {
  const {
    heading,
    ctaType,
    videoDuration,
    videoName,
    videoThumbnailUrl,
    formatVideoCaption,
    formatVideoDuration,
    children,
  } = props ?? {};
  return html`
    <c4d-feature-cta
      cta-type="${ifDefined(ctaType)}"
      video-duration="${ifDefined(videoDuration)}"
      video-name="${ifDefined(videoName)}"
      video-thumbnail-url="${ifDefined(videoThumbnailUrl)}"
      .formatVideoCaption="${ifDefined(formatVideoCaption)}"
      .formatVideoDuration="${ifDefined(formatVideoDuration)}">
      <c4d-card-heading>${heading}</c4d-card-heading>
      ${children}
    </c4d-feature-cta>
  `;
};

describe('c4d-feature-cta', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('c4d-feature-cta')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoDuration: 180,
          videoName: 'video-name-foo',
          videoThumbnailUrl: 'https://example.com/video-thumbnail-foo',
          formatVideoCaption: ({ name, duration }) => `${name}-${duration}`,
          formatVideoDuration: ({ duration }) => duration,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('c4d-feature-cta')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Overriding the default contents', function () {
    it('should not use the video name if heading is given', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoName: 'video-name-foo',
          heading: 'heading',
          children: 'video-name-bar',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for initial render
      await Promise.resolve(); // Update cycle that fires `slotchange` event
      await Promise.resolve(); // Update cycle for rendering upon `slotchange` event
      expect(
        document.body
          .querySelector('c4d-feature-cta')!
          .querySelector('c4d-card-heading')!
          .textContent!.trim()
      ).toBe('video-name-foo');
    });

    it('should not use the thumbnail image if image is given', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoName: 'video-name-foo',
          children: html`
            <c4d-image slot="image" alt="image-alt-foo"></c4d-image>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for initial render
      await Promise.resolve(); // Update cycle that fires `slotchange` event
      await Promise.resolve(); // Update cycle for rendering upon `slotchange` event
      expect(
        document.body
          .querySelector('c4d-feature-cta')!
          .shadowRoot!.querySelector('c4d-image[alt="video-name-foo"]')
          ?.getBoundingClientRect().height
      ).toBe(0);
      expect(
        document.body
          .querySelector('c4d-feature-cta')!
          .querySelector('c4d-image[alt="image-alt-foo"]')
          ?.getBoundingClientRect().height
      ).not.toEqual(0);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
