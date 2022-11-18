/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../content-block-segmented';
import '../content-block-segmented-item';

const image = html`
  <dds-image
    slot="media"
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="Mauris iaculis eget dolor nec hendrerit."
  >
  </dds-image>
`;

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-block-segmented>
      <dds-content-block-heading>heading-foo</dds-content-block-heading>
      <dds-content-block-copy>copy-foo</dds-content-block-copy>
      ${children}
    </dds-content-block-segmented>
  `;
};

describe('dds-content-block-segmented', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-segmented')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            ${image}
            <dds-content-block-segmented-item>
            </dds-content-block-segmented-item>
            <dds-content-block-complementary> </dds-content-block-complementary>
            <dds-card-cta
              slot="footer"
              cta-type="local"
              href="https://example.com"
            >
              Lorem ipsum dolor
            </dds-card-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-segmented')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
