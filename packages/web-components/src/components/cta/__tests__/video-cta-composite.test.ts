/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer.js';
import DDSModal from '../../modal/modal';
import DDSLightboxVideoPlayerComposite from '../../lightbox-media-viewer/lightbox-video-player-composite';
import '../video-cta-composite';

const template = () => html`
  <dds-video-cta-composite></dds-video-cta-composite>
`;

describe('dds-video-cta-composite', function() {
  describe('Handling video type', function() {
    beforeEach(function() {
      spyOn(VideoPlayerAPI, 'api').and.returnValue(Promise.resolve({}));
      spyOn(VideoPlayerAPI, 'embedVideo').and.returnValue(Promise.resolve({ kWidget() {} }));
    });

    it('should render the media viewer', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const { modalRenderRoot } = document.querySelector('dds-video-cta-composite') as any;
      expect(modalRenderRoot).toMatchSnapshot();
    });

    it('should support opening/closing the media viewer', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const videoCTAComposite = document.querySelector('dds-video-cta-composite');
      videoCTAComposite!.dispatchEvent(
        new CustomEvent('dds-cta-run-action', { detail: { ctaType: 'video', href: '0_uka1msg4' } })
      );
      await Promise.resolve(); // Update cycle for `<dds-video-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-lightbox-video-player-composite>`
      const { modalRenderRoot } = document.querySelector('dds-video-cta-composite') as any;
      const lightboxVideoPlayerComposite = modalRenderRoot!.querySelector(
        'dds-lightbox-video-player-composite'
      ) as DDSLightboxVideoPlayerComposite;
      const lightboxRenderRoot = lightboxVideoPlayerComposite.modalRenderRoot as Element;
      expect((lightboxRenderRoot.querySelector('dds-modal') as DDSModal).open).toBe(true);
      const { videoId: videoIdInVideoPlayerCompositeOpen } = lightboxVideoPlayerComposite;
      expect(videoIdInVideoPlayerCompositeOpen).toBe('0_uka1msg4');
      (lightboxRenderRoot.querySelector('dds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect((lightboxRenderRoot.querySelector('dds-modal') as DDSModal).open).toBe(false);
      const { videoId: videoIdInVideoPlayerCompositeClosed } = lightboxVideoPlayerComposite;
      expect(videoIdInVideoPlayerCompositeClosed).toBeFalsy();
    });
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
