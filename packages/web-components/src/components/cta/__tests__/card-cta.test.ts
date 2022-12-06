/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { CTA_TYPE } from '../defs';
import '../card-cta';
import '../card-cta-footer';

const template = (props?) => {
  const {
    ctaType,
    videoDuration,
    videoName,
    videoThumbnailUrl,
    formatVideoCaption,
    formatVideoDuration,
    children,
  } = props ?? {};
  return html`
    <dds-card-cta
      cta-type="${ifDefined(ctaType)}"
      video-duration="${ifDefined(videoDuration)}"
      video-name="${ifDefined(videoName)}"
      video-thumbnail-url="${ifDefined(videoThumbnailUrl)}"
      .formatVideoCaption="${ifDefined(formatVideoCaption)}"
      .formatVideoDuration="${ifDefined(formatVideoDuration)}">
      ${children}
    </dds-card-cta>
  `;
};

describe('dds-card-cta', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-card-cta')).toMatchSnapshot({
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
          formatVideoCaption: ({ name }) => `${name}-caption`,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-card-cta')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render footer with various attributes', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoDuration: 180,
          videoName: 'video-name-foo',
          videoThumbnailUrl: 'https://example.com/video-thumbnail-foo',
          // Should yeild to `undefined` in `name` part given card footer doesn't render the video name
          formatVideoCaption: ({ name, duration }) => `${name}-${duration}`,
          formatVideoDuration: ({ duration }) => duration,
          children: html` <dds-card-cta-footer></dds-card-cta-footer> `,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-card-cta>`
      await Promise.resolve(); // Update cycle for `<dds-card-cta-footer>` upon property forwarding
      expect(
        document.body.querySelector('dds-card-cta-footer')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Overriding the default contents', function () {
    it('should not use the video name if copy content is given', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
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
          .querySelector('dds-card-cta')!
          .shadowRoot!.querySelector('.bx--card__copy')!
          .textContent!.trim()
      ).toBe('');
    });

    it('should not use the thumbnail image if image is given', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
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
        document.body
          .querySelector('dds-card-cta')!
          .shadowRoot!.querySelector('dds-image[alt="video-name-foo"]')
      ).toBeNull();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
