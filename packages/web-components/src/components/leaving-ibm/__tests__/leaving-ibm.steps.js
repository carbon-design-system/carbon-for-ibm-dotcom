/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-leaving-ibm-*', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}iframe.html?id=components-leaving-ibm--default`
    );
  });

  it('should have modal closable', async () => {
    await page.click('cds-modal-close-button button');
    await expect(page).toHaveSelector(
      'cds-leaving-ibm-modal .cds--modal-container',
      { state: 'hidden' }
    );
  });
});
