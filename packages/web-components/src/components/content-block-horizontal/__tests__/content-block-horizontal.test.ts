/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../../content-item-horizontal/content-item-horizontal';
import '../../content-item-horizontal/content-item-horizontal-copy';
import '../../content-item-horizontal/content-item-horizontal-eyebrow';
import '../content-block-horizontal';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { CTA_TYPE } from '../../cta/defs';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-block-horizontal> ${children} </dds-content-block-horizontal>
  `;
};

describe('dds-content-block-horizontal', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <dds-content-item-horizontal>
              <dds-content-item-horizontal-eyebrow>eyebrow-foo</dds-content-item-horizontal-eyebrow>
              <dds-content-item-heading>heading-foo</dds-content-item-heading>
              <dds-content-item-horizontal-copy>copy-foo</dds-content-item-horizontal-copy>
              <dds-link-list slot="footer" type="vertical">
                <dds-link-list-item-cta
                  icon-placement="${ICON_PLACEMENT.RIGHT}"
                  href="https://www.ibm.com"
                  cta-type="${CTA_TYPE.LOCAL}"
                >
                  cta-copy-foo
                </dds-link-list-item-cta>
                <dds-link-list-item-cta
                  icon-placement="${ICON_PLACEMENT.RIGHT}"
                  href="https://www.ibm.com"
                  cta-type="${CTA_TYPE.EXTERNAL}"
                >
                  cta-copy-foo
                </dds-link-list-item-cta>
              </dds-link-list>
             </content-item-horizontal>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
