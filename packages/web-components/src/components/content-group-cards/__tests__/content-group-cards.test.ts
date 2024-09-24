/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import '../../card/card-heading';
import '../content-group-cards';
import '../content-group-cards-item';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-group-cards> ${children} </c4d-content-group-cards>
  `;
};

describe('c4d-content-group-cards', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-group-cards')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <c4d-content-group-heading>heading-foo</c4d-content-group-heading>
            <p>copy-foo</p>
            <c4d-content-group-cards-item href="https://www.example.com">
              <c4d-card-heading>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt
              </c4d-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <c4d-card-footer icon-placement="left">
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-card-footer>
            </c4d-content-group-cards-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-group-cards')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
