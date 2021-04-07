/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { CTA_TYPE } from '../../cta/defs';
import '../../content-group/content-group-heading';
import '../../cta/link-list-item-cta';
import '../../link-list/link-list';
import '../../content-group-banner/content-group-banner';
import '../content-section-banner';

const template = (props?) => {
  const { heading, children } = props ?? {};
  return html`
    <dds-content-section-banner>
      <dds-content-section-heading>${ifNonNull(heading)}</dds-content-section-heading>
      <dds-content-group-banner>${children}</dds-content-group-banner>
    </dds-content-section-banner>
  `;
};

describe('dds-content-section-banner', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-section-banner')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          heading: 'heading-foo',
          children: html`
            <dds-content-group-heading>heading-foo</dds-content-group-heading>
            <dds-link-list type="vertical" slot="complementary">
              <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="${CTA_TYPE.LOCAL}">
                cta-copy-foo
              </dds-link-list-item-cta>
              <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="${CTA_TYPE.EXTERNAL}">
                cta-copy-foo
              </dds-link-list-item-cta>
            </dds-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-content-section-banner>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-content-section-banner')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
