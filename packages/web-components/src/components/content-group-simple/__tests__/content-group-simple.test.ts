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
import '../content-group-simple';

const template = (props?) => {
  const { copy, children } = props ?? {};
  return html`
    <dds-content-group-simple .copy="${ifNonNull(copy)}">
      ${children}
    </dds-content-group-simple>
  `;
};

describe('dds-content-group-simple', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-group-simple')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          copy: 'copy-foo',
          children: html`
            <div slot="footer">footer-foo</div>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-content-group-simple>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-content-group-simple')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
