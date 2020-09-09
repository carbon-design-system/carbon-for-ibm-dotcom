/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { CTA_TYPE } from '../shared-enums';
import '../feature-cta';

const template = (props?) => {
  const { type, videoDuration, videoName, videoThumbnailUrl, formatVideoCaption, formatVideoDuration, children } = props ?? {};
  return html`
    <dds-feature-cta
      type="${ifDefined(type)}"
      video-duration="${ifDefined(videoDuration)}"
      video-name="${ifDefined(videoName)}"
      video-thumbnail-url="${ifDefined(videoThumbnailUrl)}"
      .formatVideoCaption="${ifDefined(formatVideoCaption)}"
      .formatVideoDuration="${ifDefined(formatVideoDuration)}"
    >
      ${children}
    </dds-feature-cta>
  `;
};

describe('dds-feature-cta', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-feature-cta')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          type: CTA_TYPE.VIDEO,
          videoDuration: 180,
          videoName: 'video-name-foo',
          videoThumbnailUrl: 'https://example.com/video-thumbnail-foo',
          formatVideoCaption: ({ name, duration }) => `${name}-${duration}`,
          formatVideoDuration: ({ duration }) => duration,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-feature-cta')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Overriding the default contents', function() {
    it('should not use the video name if copy content is given', async function() {
      render(
        template({
          type: CTA_TYPE.VIDEO,
          videoName: 'video-name-foo',
          children: 'video-name-bar',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for initial render
      await Promise.resolve(); // Update cycle that fires `slotchange` event
      await Promise.resolve(); // Update cycle for rendering upon `slotchange` event
      expect(
        document.body
          .querySelector('dds-feature-cta')!
          .shadowRoot!.querySelector('.bx--card__copy')!
          .textContent!.trim()
      ).toBe('');
    });

    it('should not use the thumbnail image if image is given', async function() {
      render(
        template({
          type: CTA_TYPE.VIDEO,
          videoName: 'video-name-foo',
          children: html`
            <dds-image slot="image" alt="image-alt-foo"></dds-image>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for initial render
      await Promise.resolve(); // Update cycle that fires `slotchange` event
      await Promise.resolve(); // Update cycle for rendering upon `slotchange` event
      expect(
        document.body.querySelector('dds-feature-cta')!.shadowRoot!.querySelector('dds-image[alt="video-name-foo"]')
      ).toBeNull();
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
