/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import Download20 from 'carbon-web-components/es/icons/download/20';
import Launch20 from 'carbon-web-components/es/icons/launch/20';
import PlayOutline20 from 'carbon-web-components/es/icons/play--outline/20';
import DDSModal from '../../modal/modal';
import DDSLightboxVideoPlayerContainer from '../../lightbox-media-viewer/lightbox-video-player-container';
import { CTA_STYLE, CTA_TYPE } from '../cta-container';
import { Default } from '../__stories__/cta.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-cta-container': props,
      },
    },
  });

describe('dds-cta-container', function() {
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
      const ctaContainer = document.querySelector('dds-cta-container');
      expect(ctaContainer).toMatchSnapshot();
      expect(ctaContainer!.querySelector('svg')).toBeNull();
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
      await Promise.resolve(); // Update cycle for `<dds-cta-container>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaContainer = document.querySelector('dds-cta-container');
      expect(ctaContainer).toMatchSnapshot();
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
      await Promise.resolve(); // Update cycle for `<dds-cta-container>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaContainer = document.querySelector('dds-cta-container');
      expect(ctaContainer).toMatchSnapshot();
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
      await Promise.resolve(); // Update cycle for `<dds-cta-container>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaContainer = document.querySelector('dds-cta-container');
      expect(ctaContainer).toMatchSnapshot();
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
      await Promise.resolve(); // Update cycle for `<dds-cta-container>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaContainer = document.querySelector('dds-cta-container');
      expect(ctaContainer).toMatchSnapshot();
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
      await Promise.resolve(); // Update cycle for `<dds-cta-container>`
      await Promise.resolve(); // Update cycle for `<dds-text-cta>`
      const ctaContainer = document.querySelector('dds-cta-container');
      expect(ctaContainer).toMatchSnapshot();
      const icon = document.querySelector('dds-text-cta')!.shadowRoot!.querySelector('svg.dds-ce--cta__icon');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });
  });

  describe('Handling video type', function() {
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
      const { _modalContainerRoot: modalContainerRoot } = document.querySelector('dds-cta-container') as any;
      expect(modalContainerRoot).toMatchSnapshot();
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
      const ctaContainer = document.querySelector('dds-cta-container');
      ctaContainer!.dispatchEvent(new CustomEvent('dds-cta-run-action', { detail: { href: '0_uka1msg4' } }));
      await Promise.resolve();
      const { _modalContainerRoot: modalContainerRoot } = document.querySelector('dds-cta-container') as any;
      expect((modalContainerRoot!.querySelector('dds-modal') as DDSModal).open).toBe(true);
      const { videoId: videoIdInVideoPlayerContainerOpen } = modalContainerRoot!.querySelector(
        'dds-lightbox-video-player-container'
      ) as DDSLightboxVideoPlayerContainer;
      expect(videoIdInVideoPlayerContainerOpen).toBe('0_uka1msg4');
      modalContainerRoot!.querySelector('bx-modal-close-button').click();
      await Promise.resolve();
      expect((modalContainerRoot!.querySelector('dds-modal') as DDSModal).open).toBe(false);
      const { videoId: videoIdInVideoPlayerContainerClosed } = modalContainerRoot!.querySelector(
        'dds-lightbox-video-player-container'
      ) as DDSLightboxVideoPlayerContainer;
      expect(videoIdInVideoPlayerContainerClosed).toBeFalsy();
    });
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
