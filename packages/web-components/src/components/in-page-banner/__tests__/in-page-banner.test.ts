/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../../content-group/content-group-heading';
import '../../cta/link-list-item-cta';
import '../../link-list/link-list';
import '../in-page-banner';
import { CTA_TYPE } from '../../cta/defs';

const template = (props?) => {
  const { children } = props ?? {};
  return html` <c4d-in-page-banner> ${children} </c4d-in-page-banner> `;
};

describe('c4d-in-page-banner', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('c4d-in-page-banner')).toMatchSnapshot(
        { mode: 'shadow' }
      );
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <c4d-content-group-heading>heading-foo</c4d-content-group-heading>
            <c4d-link-list slot="footer" type="vertical">
              <c4d-link-list-item-cta
                icon-placement="right"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.LOCAL}">
                cta-copy-foo
              </c4d-link-list-item-cta>
              <c4d-link-list-item-cta
                icon-placement="right"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.EXTERNAL}">
                cta-copy-foo
              </c4d-link-list-item-cta>
            </c4d-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('c4d-in-page-banner')).toMatchSnapshot(
        { mode: 'shadow' }
      );
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
