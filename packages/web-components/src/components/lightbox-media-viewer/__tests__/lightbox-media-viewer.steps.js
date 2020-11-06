/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('dds-lightbox-media-viewer-*', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-lightbox-media-viewer--embedded-video-player`
    );
  });

  it('should have modal closable', async () => {
    await page.click('dds-expressive-modal-close-button button');
    await expect(page).toHaveSelector('dds-expressive-modal .bx--modal-container', { state: 'hidden' });
  });
});
