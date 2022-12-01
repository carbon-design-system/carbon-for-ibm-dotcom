/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowRight20 from '@carbon/carbon-web-components/es/icons/arrow--right/20';

import '../card-section-offset';

const template = (props?) => {
  const { heading, cta, children } = props ?? {};
  return html`
    <dds-card-section-offset>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      ${cta}
      <dds-card-group>${children}</dds-card-group>
    </dds-card-section-offset>
  `;
};

describe('dds-card-section-offset', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-card-section-offset')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          cta: html`
            <dds-text-cta
              slot="action"
              cta-type="local"
              icon-placement="right"
              href="https://example.com"
            >
              CTA copy
            </dds-text-cta>
          `,
          cards: html`
            <dds-card-group-item empty></dds-card-group-item>
            <dds-card-group-item href="https://example.com">
              <dds-card-eyebrow>Topic</dds-card-eyebrow>
              <dds-card-heading>Natural Language Processing.</dds-card-heading>
              <dds-card-cta-footer slot="footer">
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-cta-footer>
            </dds-card-group-item>
            <dds-card-group-item href="https://example.com">
              <dds-card-eyebrow>Topic</dds-card-eyebrow>
              <dds-card-heading>Natural Language Processing.</dds-card-heading>
              <dds-card-footer slot="footer">
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-footer>
            </dds-card-group-item>
            <dds-card-group-item href="https://example.com">
              <dds-card-eyebrow>Topic</dds-card-eyebrow>
              <dds-card-heading>Natural Language Processing.</dds-card-heading>
              <dds-card-cta-footer slot="footer">
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-cta-footer>
            </dds-card-group-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-card-section-offset>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(
        document.body.querySelector('dds-card-section-offset')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
