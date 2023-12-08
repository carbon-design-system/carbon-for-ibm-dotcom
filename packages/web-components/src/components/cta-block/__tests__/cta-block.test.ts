/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../cta-block';

const template = (props?) => {
  const { copy, heading, children } = props ?? {};
  return html`
    <c4d-cta-block>
      <c4d-content-block-heading
        >${ifDefined(heading)}</c4d-content-block-heading
      >
      <c4d-cta-block-copy>${ifDefined(copy)}</c4d-cta-block-copy>
      ${children}
    </c4d-cta-block>
  `;
};

describe('c4d-cta-block', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('c4d-cta-block')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          copy: 'copy-foo',
          children: html`
            <div slot="action">action-foo</div>
            <div slot="footer">footer-foo</div>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<c4d-cta-section>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('c4d-cta-block')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
