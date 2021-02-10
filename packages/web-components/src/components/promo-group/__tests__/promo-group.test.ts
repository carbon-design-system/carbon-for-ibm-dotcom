/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../../content-section/content-section';
import '../../content-section/content-section-heading';
import '../../card/card-heading';
import '../../card-group/card-group';
import '../../card-group/card-group-item';
import '../promo-group';

const template = (props?) => {
  const { heading, children } = props ?? {};
  return html`
    <dds-promo-group>
      <dds-content-section-heading>${ifNonNull(heading)}</dds-content-section-heading>
      <dds-card-group slot="group-items">${children}</dds-card-group>
    </dds-promo-group>
  `;
};

describe('dds-promo-group', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-promo-group')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          heading: 'heading-foo',
          cards: html`
            <dds-promo-item>
              <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
              <dds-content-item-copy slot="copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.</dds-content-item-copy>
              <dds-link-with-icon href="https://example.com" slot="footer">
                Lorem ipsum dolor ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-promo-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-promo-group>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-promo-group')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
