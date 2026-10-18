/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import '../../cta/button-cta';
import '../promo-banner';
import C4DPromoBanner from '../promo-banner';
import { CTA_TYPE } from '../../cta/defs';

const template = (props?) => {
  const {
    heading,
    copy,
    cta,
    ctaType = CTA_TYPE.LOCAL,
    href = 'https://example.com',
  } = props ?? {};
  return html`
    <c4d-promo-banner>
      <h5>${heading}</h5>
      <p>${copy}</p>
      ${cta
        ? html`
            <c4d-button-cta
              cta-type="${ctaType}"
              kind="tertiary"
              slot="cta"
              href="${href}">
              ${cta}
            </c4d-button-cta>
          `
        : ''}
    </c4d-promo-banner>
  `;
};

describe('c4d-promo-banner', function () {
  describe('Rendering', function () {
    it('should render desktop layout by default', async function () {
      render(
        template({
          heading: 'Heading',
          copy: 'Copy',
          cta: 'Try Today',
        }),
        document.body
      );
      await Promise.resolve();
      const element = document.body.querySelector(
        'c4d-promo-banner'
      ) as C4DPromoBanner;
      expect(element).toBeDefined();
      expect(
        element.shadowRoot?.querySelector('.banner-wrapper')
      ).toBeDefined();
    });

    it('should render mobile layout and cta icon without error', async function () {
      render(
        template({
          heading: 'Heading',
          copy: 'Copy',
          cta: 'Try Today',
          ctaType: CTA_TYPE.LOCAL,
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve();
      const element = document.body.querySelector(
        'c4d-promo-banner'
      ) as C4DPromoBanner;
      element.isDesktopVersion = false;
      element.requestUpdate();
      await element.updateComplete;

      const ctaLink = element.shadowRoot?.querySelector('a.banner-cta');
      expect(ctaLink).toBeDefined();
      expect(ctaLink?.getAttribute('href')).toBe('https://example.com');

      const icon = element.shadowRoot?.querySelector('.banner-cta-icon svg');
      expect(icon).toBeDefined();
    });

    it('should swap between mobile and desktop layout when breakpoint changes', async function () {
      render(
        template({
          heading: 'Heading',
          copy: 'Copy',
          cta: 'Try Today',
          ctaType: CTA_TYPE.LOCAL,
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve();
      const element = document.body.querySelector(
        'c4d-promo-banner'
      ) as C4DPromoBanner;
      expect(element).toBeDefined();

      // Switch to mobile layout
      element.isDesktopVersion = false;
      element.requestUpdate();
      await element.updateComplete;
      expect(element.isDesktopVersion).toBe(false);
      expect(element.shadowRoot?.querySelector('a.banner-cta')).toBeDefined();

      // Switch to desktop layout
      element.isDesktopVersion = true;
      element.requestUpdate();
      await element.updateComplete;
      expect(element.isDesktopVersion).toBe(true);
      expect(
        element.shadowRoot?.querySelector('.banner-wrapper slot[name="cta"]')
      ).toBeDefined();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
