/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../cta-block';

const template = (props?) => {
  // @ts-ignore: Behind feature flag
  Default({
    parameters: {
      props: {
        'dds-feature-name': props,
      },
    },
  });
  const { sectionTitle, sectionContentGroup, ctaBlockChildren } = props ?? {};
  return html`
    <dds-cta-block>
      <dds-content-section-heading>${ifNonNull(sectionTitle)}</dds-content-section-heading>
      <dds-content-group>${sectionContentGroup}</dds-content-group>
      ${ctaBlockChildren}
    </dds-cta-block>
  `;
};

describe('dds-cta-block', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-cta-block')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          sectionTitle: 'section-title-foo',
          sectionContentGroup: html`
            <dds-content-group>
              <dds-content-group-heading>content-group-heading-foo</dds-content-group-heading>
              <dds-content-group-copy>content-group-copy-foo</dds-content-group-copy>
              <dds-link-with-icon></dds-link-with-icon>
              <dds-content-group> </dds-content-group
            ></dds-content-group>
          `,
          ctaBlockChildren: html`
            <dds-cta-block-item>
              <dds-image slot="media">media-foo</dds-image>
              <dds-content-item-heading slot="heading">content-item-heading-foo</dds-content-item-heading>
              <dds-content-item-copy>content-item-copy-foo</dds-content-item-copy>
              <dds-link-with-icon slot="footer">link-with-icon-foo</dds-link-with-icon>
            </dds-cta-block-item>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-cta-block>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-cta-block')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
