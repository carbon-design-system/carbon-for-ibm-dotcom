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
import { BASIC_COLOR_SCHEME } from '../../../globals/defs';
import '../content-item';
import '../content-item-copy';

const template = (props?) => {
  const { colorScheme, children } = props ?? {};
  return html`
    <c4d-content-item color-scheme="${ifDefined(colorScheme)}">
      ${children}
    </c4d-content-item>
  `;
};

describe('c4d-content-item', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('c4d-content-item')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          colorScheme: BASIC_COLOR_SCHEME.INVERSE,
          children: html`
            <c4d-video-player
              slot="media"
              duration="90"
              name="name-foo"></c4d-video-player>
            <c4d-content-item-copy>copy-foo</c4d-content-item-copy>
            <c4d-text-cta slot="footer" cta-type="local">copy-foo</c4d-text-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<c4d-content-item>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('c4d-content-item')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
