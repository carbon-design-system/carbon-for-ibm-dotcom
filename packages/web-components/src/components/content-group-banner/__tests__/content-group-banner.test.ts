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
import '../content-group-banner';
import { CTA_TYPE } from '../../cta/defs';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-group-banner> ${children} </dds-content-group-banner>
  `;
};

describe('dds-content-group-banner', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-group-banner')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          children: html`
            <dds-content-group-heading>heading-foo</dds-content-group-heading>
            <dds-link-list slot="footer" type="vertical">
              <dds-link-list-item-cta
                icon-placement="right"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.LOCAL}">
                cta-copy-foo
              </dds-link-list-item-cta>
              <dds-link-list-item-cta
                icon-placement="right"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.EXTERNAL}">
                cta-copy-foo
              </dds-link-list-item-cta>
            </dds-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-group-banner')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
