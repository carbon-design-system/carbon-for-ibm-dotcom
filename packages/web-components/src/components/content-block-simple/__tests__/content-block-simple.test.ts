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
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
import '../content-block-simple';

const template = (props?) => {
  const { complementaryStyleScheme, children } = props ?? {};
  return html`
    <c4d-content-block-simple
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      ${children}
    </c4d-content-block-simple>
  `;
};

describe('c4d-content-block-simple', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-simple')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          complementaryStyleScheme:
            CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
          children: html` <div slot="complementary">complementary-foo</div> `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<c4d-content-block-simple>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(
        document.body.querySelector('c4d-content-block-simple')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
