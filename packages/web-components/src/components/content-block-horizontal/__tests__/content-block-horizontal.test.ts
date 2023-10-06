/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../../content-item-row/content-item-row';
import '../../content-item-row/content-item-row-copy';
import '../../content-item-row/content-item-row-eyebrow';
import '../content-block-horizontal';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { CTA_TYPE } from '../../cta/defs';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-block-horizontal> ${children} </c4d-content-block-horizontal>
  `;
};

describe('c4d-content-block-horizontal', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <c4d-content-item-row>
              <c4d-content-item-row-eyebrow>eyebrow-foo</c4d-content-item-row-eyebrow>
              <c4d-content-item-heading>heading-foo</c4d-content-item-heading>
              <c4d-content-item-row-copy>copy-foo</c4d-content-item-row-copy>
              <c4d-link-list slot="footer" type="vertical">
                <c4d-link-list-item-cta
                  icon-placement="${ICON_PLACEMENT.RIGHT}"
                  href="https://www.ibm.com"
                  cta-type="${CTA_TYPE.LOCAL}"
                >
                  cta-copy-foo
                </c4d-link-list-item-cta>
                <c4d-link-list-item-cta
                  icon-placement="${ICON_PLACEMENT.RIGHT}"
                  href="https://www.ibm.com"
                  cta-type="${CTA_TYPE.EXTERNAL}"
                >
                  cta-copy-foo
                </c4d-link-list-item-cta>
              </c4d-link-list>
             </content-item-row>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
