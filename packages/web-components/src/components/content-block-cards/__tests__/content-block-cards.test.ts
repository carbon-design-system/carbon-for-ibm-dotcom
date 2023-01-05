/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../card/card-heading';
import '../content-block-cards';

const template = (props?) => {
  const { heading, children, ctaType, href } = props ?? {};
  return html`
    <dds-content-block-cards>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-card-group>${children}</dds-card-group>
      <dds-card-cta
        slot="footer"
        cta-type="${ifDefined(ctaType)}"
        href="${ifDefined(href)}">
        <p>ctaCopy-foo</p>
        ${ArrowRight20({ slot: 'footer' })}
      </dds-card-cta>
    </dds-content-block-cards>
  `;
};

describe('dds-content-block-cards', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-cards')
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
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-cards')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
