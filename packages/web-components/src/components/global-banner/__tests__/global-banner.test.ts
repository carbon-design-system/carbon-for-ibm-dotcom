/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import '../index';
import C4DGlobalBanner from '../global-banner';

const renderBanner = async () => {
  render(
    html`
      <c4d-global-banner>
        <c4d-global-banner-heading>Heading</c4d-global-banner-heading>
        <c4d-button slot="cta" cta-type="local" href="https://example.com">
          CTA
        </c4d-button>
      </c4d-global-banner>
    `,
    document.body
  );
  const banner = document.body.querySelector(
    'c4d-global-banner'
  ) as C4DGlobalBanner;
  await banner.updateComplete;
  // Let the `slotchange` event on the CTA slot fire naturally.
  await new Promise((resolve) => setTimeout(resolve, 50));
  await banner.updateComplete;
  return banner;
};

/**
 * Simulates the `lg` media query changing, going through the component's
 * real resize handler.
 */
const setBreakpointMatches = async (
  banner: C4DGlobalBanner,
  matches: boolean
) => {
  (banner as any)._breakpoint = { matches };
  (banner as any)._handleResize();
  await banner.updateComplete;
};

describe('c4d-global-banner', function () {
  afterEach(function () {
    render(html``, document.body);
  });

  it('should render the CTA icon in the static (desktop) layout', async function () {
    const banner = await renderBanner();
    await setBreakpointMatches(banner, true);

    expect(banner.shadowRoot?.querySelector('a')).toBeNull();
    expect(banner.ctaType).toBe('local');
    expect(
      banner.shadowRoot?.querySelector('[part="icon"] svg')
    ).not.toBeNull();
  });

  it('should render the CTA icon in the link (mobile) layout', async function () {
    const banner = await renderBanner();
    await setBreakpointMatches(banner, false);

    expect(banner.shadowRoot?.querySelector('a')).not.toBeNull();
    expect(banner.ctaType).toBe('local');
    expect(
      banner.shadowRoot?.querySelector('[part="icon"] svg')
    ).not.toBeNull();
  });

  describe('Image', function () {
    const renderBannerWithImage = async () => {
      render(
        html`
          <c4d-global-banner image-width="4-col">
            <c4d-global-banner-image
              default-src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
              alt="Alt text"></c4d-global-banner-image>
            <c4d-global-banner-heading>Heading</c4d-global-banner-heading>
          </c4d-global-banner>
        `,
        document.body
      );
      const banner = document.body.querySelector(
        'c4d-global-banner'
      ) as C4DGlobalBanner;
      await banner.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 50));
      await banner.updateComplete;
      return banner;
    };

    it('should reflect the has-image attribute when an image is slotted', async function () {
      const banner = await renderBannerWithImage();

      expect(banner.hasImage).toBe(true);
      expect(banner.hasAttribute('has-image')).toBe(true);
    });

    it('should reflect image-width and has-image so the styles can hide the image below lg', async function () {
      const banner = await renderBannerWithImage();

      // The layout styles key off of these attributes (`:host([has-image])`
      // hides the image container below the `lg` breakpoint).
      expect(banner.getAttribute('image-width')).toBe('4-col');
      expect(banner.hasAttribute('has-image')).toBe(true);
    });
  });

  describe('Text', function () {
    it('should render the heading text', async function () {
      const banner = await renderBanner();
      const heading = banner.querySelector('c4d-global-banner-heading') as any;
      await heading.updateComplete;

      expect(heading.shadowRoot?.textContent?.trim()).toBe('Heading');
      expect(heading.getBoundingClientRect().height).toBeGreaterThan(0);
    });
  });
});
