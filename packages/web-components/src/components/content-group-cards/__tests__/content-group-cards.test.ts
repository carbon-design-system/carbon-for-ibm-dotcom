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
import '../../card/card-heading';
import '../content-group-cards';
import '../content-group-cards-item';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-group-cards> ${children} </dds-content-group-cards>
  `;
};

describe('dds-content-group-cards', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-group-cards')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <dds-content-group-heading>heading-foo</dds-content-group-heading>
            <p>copy-foo</p>
            <dds-content-group-cards-item href="https://www.example.com">
              <dds-card-heading>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt
              </dds-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <dds-card-footer icon-placement="left">
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-footer>
            </dds-content-group-cards-item>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-group-cards')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
