/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';

import '../card-section-offset';

const template = (props?) => {
  const { heading, cta, children } = props ?? {};
  return html`
    <c4d-card-section-offset>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      ${cta}
      <c4d-card-group>${children}</c4d-card-group>
    </c4d-card-section-offset>
  `;
};

describe('c4d-card-section-offset', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-card-section-offset')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          cta: html`
            <c4d-text-cta
              slot="action"
              cta-type="local"
              icon-placement="right"
              href="https://example.com">
              CTA copy
            </c4d-text-cta>
          `,
          cards: html`
            <c4d-card-group-item href="https://example.com">
              <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
              <c4d-card-heading>Natural Language Processing.</c4d-card-heading>
              <c4d-card-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-card-footer>
            </c4d-card-group-item>
            <c4d-card-group-item href="https://example.com">
              <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
              <c4d-card-heading>Natural Language Processing.</c4d-card-heading>
              <c4d-card-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-card-footer>
            </c4d-card-group-item>
            <c4d-card-group-item href="https://example.com">
              <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
              <c4d-card-heading>Natural Language Processing.</c4d-card-heading>
              <c4d-card-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-card-footer>
            </c4d-card-group-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<c4d-card-section-offset>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(
        document.body.querySelector('c4d-card-section-offset')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
