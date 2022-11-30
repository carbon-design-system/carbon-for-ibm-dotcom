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
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import '../../card/card-heading';
import '../card-section-simple';

const template = (props?) => {
  const { heading, children } = props ?? {};
  return html`
    <dds-card-section-simple heading=${ifNonNull(heading)}>
      <dds-card-group>${children}</dds-card-group>
    </dds-card-section-simple>
  `;
};

describe('dds-card-section-simple', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-card-section-simple')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          cards: html`
            <dds-card-group-item href="https://example.com">
              <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                et ultricies est. Mauris iaculis eget dolor nec hendrerit.
                Phasellus at elit sollicitudin, sodales nulla quis, consequat
                libero.
              </p>
              <dds-card-cta-footer slot="footer">
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-cta-footer>
            </dds-card-group-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-card-section-simple>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(
        document.body.querySelector('dds-card-section-simple')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
