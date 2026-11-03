/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CTA_TYPE } from '../defs';
import '../text-cta';

const template = (props?) => {
  const {
    ctaType,
    target,
    videoDuration,
    videoName,
    videoThumbnailUrl,
    formatVideoCaption,
    formatVideoDuration,
    children,
  } = props ?? {};
  return html`
    <c4d-text-cta
      cta-type="${ifDefined(ctaType)}"
      target="${ifDefined(target)}"
      video-duration="${ifDefined(videoDuration)}"
      video-name="${ifDefined(videoName)}"
      video-thumbnail-url="${ifDefined(videoThumbnailUrl)}"
      .formatVideoCaption="${ifDefined(formatVideoCaption)}"
      .formatVideoDuration="${ifDefined(formatVideoDuration)}">
      ${children}
    </c4d-text-cta>
  `;
};

describe('c4d-text-cta', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('c4d-text-cta')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          target: '_blank',
          videoDuration: 180,
          videoName: 'video-name-foo',
          videoThumbnailUrl: 'https://example.com/video-thumbnail-foo',
          formatVideoCaption: ({ name }) => `${name}-caption`,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('c4d-text-cta')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Video CTA with slotted text', function () {
    it('should not render the video caption next to the slotted text', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoName: 'Meet Mombo',
          children: 'Video Link',
        }),
        document.body
      );
      const cta = document.body.querySelector('c4d-text-cta') as any;
      await cta.updateComplete;
      // Let the `slotchange` event on the default slot fire naturally.
      await new Promise((resolve) => setTimeout(resolve, 50));
      await cta.updateComplete;

      const link = cta.shadowRoot.querySelector('a') as HTMLElement;
      const slot = cta.shadowRoot.querySelector('a slot') as HTMLSlotElement;
      expect(
        slot
          .assignedNodes()
          .map((node) => node.textContent)
          .join('')
          .trim()
      ).toBe('Video Link');
      expect(link.textContent).not.toContain('Meet Mombo');
    });

    it('should render the video caption when there is no slotted text', async function () {
      render(
        template({ ctaType: CTA_TYPE.VIDEO, videoName: 'Meet Mombo' }),
        document.body
      );
      const cta = document.body.querySelector('c4d-text-cta') as any;
      await cta.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 50));
      await cta.updateComplete;

      const link = cta.shadowRoot.querySelector('a') as HTMLElement;
      expect(link.textContent).toContain('Meet Mombo');
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
