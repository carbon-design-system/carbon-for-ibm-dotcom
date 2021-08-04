/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../card-section-images';

const template = (props?) => {
  const { heading, children } = props ?? {};
  return html`
    <dds-card-section-images heading=${ifNonNull(heading)}>
      <dds-card-group>${children}</dds-card-group>
    </dds-card-section-images>
  `;
};

describe('dds-card-section-images', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-card-section-images')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          heading: 'heading-foo',
          cards: html`
            <dds-card-group-item href="https://example.com">
              <dds-image
                slot="image"
                alt="Image alt text"
                default-src="https://dummyimage.com/1056x792/ee5396/161616&amp;text=4:3"
              >
              </dds-image>
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
      await Promise.resolve(); // The update cycle of `<dds-card-section-images>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-card-section-images')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
