/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import '../index';

const template = (props?) => {
  const { heading, cards, contentItemHeading, contentItemCopy } = props ?? {};
  return html`
    <c4d-content-block-card-static>
      <c4d-card-group-item>${heading}</c4d-card-group-item>
      <c4d-card-group>${cards}</c4d-card-group>
      <c4d-content-item>
        <c4d-content-item-heading
          >${contentItemHeading}</c4d-content-item-heading
        >
        <c4d-content-item-copy>${contentItemCopy}</c4d-content-item-copy>
      </c4d-content-item>
      <c4d-button-group>
        <c4d-button-group-item>Button 1</c4d-button-group-item>
        <c4d-button-group-item>Buuton 2</c4d-button-group-item>
      </c4d-button-group>
    </c4d-content-block-card-static>
  `;
};

describe('c4d-content-block-card-static', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-card-static')
      ).toMatchSnapshot();
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          cards: html`
            <c4d-card-group-item href="https://example.com">
              <c4d-card-heading>Nunc convallis lobortis</c4d-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                et ultricies est. Mauris iaculis eget dolor nec hendrerit.
                Phasellus at elit sollicitudin, sodales nulla quis, consequat
                libero.
              </p>
              <c4d-card-cta-footer slot="footer">
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-card-cta-footer>
            </c4d-card-group-item>
          `,
          contentItemHeading: 'Lorem ipsum',
          contentItemCopy: 'ipsum dolor sit amet',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-card-static')
      ).toMatchSnapshot();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
