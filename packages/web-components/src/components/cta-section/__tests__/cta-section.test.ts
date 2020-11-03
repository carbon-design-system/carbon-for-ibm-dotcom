/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../cta-section';

const template = (props?) => {
  const { copy, children } = props ?? {};
  return html`
    <dds-cta-section .copy="${ifNonNull(copy)}">
      ${children}
    </dds-cta-section>
  `;
};

describe('dds-cta-section', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-cta-section')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          copy: 'copy-foo',
          children: html`
            <div slot="cta">cta-foo</div>
            <div slot="footer">footer-foo</div>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-cta-section>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-cta-section')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
