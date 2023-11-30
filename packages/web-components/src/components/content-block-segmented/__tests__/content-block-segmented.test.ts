/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../content-block-segmented';
import '../content-block-segmented-item';

const image = html`
  <c4d-image
    slot="media"
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="Mauris iaculis eget dolor nec hendrerit.">
  </c4d-image>
`;

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-block-segmented>
      <c4d-content-block-heading>heading-foo</c4d-content-block-heading>
      <c4d-content-block-copy>copy-foo</c4d-content-block-copy>
      ${children}
    </c4d-content-block-segmented>
  `;
};

describe('c4d-content-block-segmented', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-segmented')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            ${image}
            <c4d-content-block-segmented-item>
            </c4d-content-block-segmented-item>
            <c4d-content-block-complementary> </c4d-content-block-complementary>
            <c4d-card-cta
              slot="footer"
              cta-type="local"
              href="https://example.com">
              Lorem ipsum dolor
            </c4d-card-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-segmented')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
