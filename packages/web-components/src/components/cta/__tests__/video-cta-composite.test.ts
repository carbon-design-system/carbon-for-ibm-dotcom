/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import C4DExpressiveModal from '../../expressive-modal/expressive-modal';
import C4DLightboxVideoPlayerComposite from '../../lightbox-media-viewer/lightbox-video-player-composite';
import '../video-cta-composite';

const template = () => html`
  <c4d-video-cta-composite></c4d-video-cta-composite>
`;

describe('c4d-video-cta-composite', function () {
  describe('Handling video type', function () {
    beforeEach(function () {
      spyOn(KalturaPlayerAPI, 'api').and.returnValue(Promise.resolve({}));
      spyOn(KalturaPlayerAPI, 'embedMedia').and.returnValue(
        Promise.resolve({ kWidget() {} })
      );
    });

    it('should render the media viewer', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const { modalRenderRoot } = document.querySelector(
        'c4d-video-cta-composite'
      ) as any;
      expect(modalRenderRoot).toMatchSnapshot();
    });

    it('should support opening/closing the media viewer', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const videoCTAComposite = document.querySelector(
        'c4d-video-cta-composite'
      );
      videoCTAComposite!.dispatchEvent(
        new CustomEvent('c4d-cta-run-action', {
          detail: { ctaType: 'video', href: '0_ibuqxqbe' },
        })
      );
      await Promise.resolve(); // Update cycle for `<c4d-video-cta-composite>`
      await Promise.resolve(); // Update cycle for `<c4d-lightbox-video-player-composite>`
      const { modalRenderRoot } = document.querySelector(
        'c4d-video-cta-composite'
      ) as any;
      const lightboxVideoPlayerComposite = modalRenderRoot!.querySelector(
        'c4d-lightbox-video-player-composite'
      ) as C4DLightboxVideoPlayerComposite;
      const lightboxRenderRoot =
        lightboxVideoPlayerComposite.modalRenderRoot as Element;
      expect(
        (
          lightboxRenderRoot.querySelector(
            'c4d-expressive-modal'
          ) as C4DExpressiveModal
        ).open
      ).toBe(true);
      const { videoId: videoIdInVideoPlayerCompositeOpen } =
        lightboxVideoPlayerComposite;
      expect(videoIdInVideoPlayerCompositeOpen).toBe('0_ibuqxqbe');
      (
        lightboxRenderRoot.querySelector(
          'c4d-expressive-modal-close-button'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        (
          lightboxRenderRoot.querySelector(
            'c4d-expressive-modal'
          ) as C4DExpressiveModal
        ).open
      ).toBe(false);
      const { videoId: videoIdInVideoPlayerCompositeClosed } =
        lightboxVideoPlayerComposite;
      expect(videoIdInVideoPlayerCompositeClosed).toBeFalsy();
    });
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});
