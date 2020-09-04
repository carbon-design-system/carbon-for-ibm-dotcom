/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Download20 from 'carbon-web-components/es/icons/download/20.js';
import Launch20 from 'carbon-web-components/es/icons/launch/20.js';
import PlayOutline20 from 'carbon-web-components/es/icons/play--outline/20.js';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer.js';
import DDSModal from '../../modal/modal';
import DDSLightboxVideoPlayerComposite from '../../lightbox-media-viewer/lightbox-video-player-composite';
/* eslint-disable import/no-duplicates */
import { CTA_STYLE, CTA_TYPE } from '../cta-composite';
// Above import is interface-only ref and thus code won't be brought into the build
import '../cta-composite';
/* eslint-enable import/no-duplicates */

const template = (props?) => {
  const { ctaStyle, item } = props ?? {};
  return html`
    <dds-cta-composite cta-style="${ctaStyle}" .item="${item}"></dds-cta-composite>
  `;
};

describe('dds-cta-composite', function() {
  describe('Text CTA', function() {
    it('should render default type', async function() {
      render(
        template({
          ctaStyle: CTA_STYLE.TEXT,
          item: {
            copy: 'copy-foo',
            href: 'https://www.example.com',
          },
        }),
        document.body
      );
      await Promise.resolve();
      const ctaComposite = document.querySelector('dds-cta-composite');
      expect(ctaComposite).toMatchSnapshot();
      expect(ctaComposite!.querySelector('svg')).toBeNull();
    });

    it('should render local type', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              href: 'https://www.example.com',
              type: CTA_TYPE.LOCAL,
            },
          })}${ArrowRight20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaComposite = document.querySelector('dds-cta-composite');
      expect(ctaComposite).toMatchSnapshot();
      const icon = document.querySelector('dds-text-cta')!.shadowRoot!.querySelector('svg.dds-ce--cta__icon');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });

    it('should render download type', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              download: 'IBM_Annual_Report_2019.pdf',
              href: 'https://www.example.com',
              type: CTA_TYPE.DOWNLOAD,
            },
          })}${Download20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaComposite = document.querySelector('dds-cta-composite');
      expect(ctaComposite).toMatchSnapshot();
      const icon = document.querySelector('dds-text-cta')!.shadowRoot!.querySelector('svg.dds-ce--cta__icon');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });

    it('should render jump type', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              href: '#example',
              type: CTA_TYPE.JUMP,
            },
          })}${ArrowDown20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaComposite = document.querySelector('dds-cta-composite');
      expect(ctaComposite).toMatchSnapshot();
      const icon = document.querySelector('dds-text-cta')!.shadowRoot!.querySelector('svg.dds-ce--cta__icon');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });

    it('should render external type', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              href: 'https://www.example.com',
              type: CTA_TYPE.EXTERNAL,
            },
          })}${Launch20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaComposite = document.querySelector('dds-cta-composite');
      expect(ctaComposite).toMatchSnapshot();
      const icon = document.querySelector('dds-text-cta')!.shadowRoot!.querySelector('svg.dds-ce--cta__icon');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });

    it('should render video type', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              href: '0_uka1msg4',
              type: CTA_TYPE.VIDEO,
            },
          })}${PlayOutline20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaComposite = document.querySelector('dds-cta-composite');
      expect(ctaComposite).toMatchSnapshot();
      const icon = document.querySelector('dds-text-cta')!.shadowRoot!.querySelector('svg.dds-ce--cta__icon');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });
  });

  describe('Handling video type', function() {
    beforeEach(function() {
      spyOn(VideoPlayerAPI, 'api').and.returnValue(Promise.resolve({}));
      spyOn(VideoPlayerAPI, 'embedVideo').and.returnValue(Promise.resolve({ kWidget() {} }));
    });

    it('should render the media viewer', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              href: '0_uka1msg4',
              type: CTA_TYPE.VIDEO,
            },
          })}
        `,
        document.body
      );
      await Promise.resolve();
      const { modalRenderRoot } = document.querySelector('dds-cta-composite') as any;
      expect(modalRenderRoot).toMatchSnapshot();
    });

    it('should support opening/closing the media viewer', async function() {
      render(
        html`
          ${template({
            ctaStyle: CTA_STYLE.TEXT,
            item: {
              copy: 'copy-foo',
              href: '0_uka1msg4',
              type: CTA_TYPE.VIDEO,
            },
          })}
        `,
        document.body
      );
      await Promise.resolve();
      const ctaComposite = document.querySelector('dds-cta-composite');
      ctaComposite!.dispatchEvent(new CustomEvent('dds-cta-run-action', { detail: { href: '0_uka1msg4', type: 'video' } }));
      await Promise.resolve(); // Update cycle for `<dds-cta-composite>`
      await Promise.resolve(); // Update cycle for `<dds-lightbox-video-player-composite>`
      const { modalRenderRoot } = document.querySelector('dds-cta-composite') as any;
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
