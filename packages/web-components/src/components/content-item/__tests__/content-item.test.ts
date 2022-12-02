/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import { BASIC_COLOR_SCHEME } from '../../../globals/defs';
import '../content-item';
import '../content-item-copy';

const template = (props?) => {
  const { colorScheme, children } = props ?? {};
  return html`
    <dds-content-item color-scheme="${ifNonNull(colorScheme)}">
      ${children}
    </dds-content-item>
  `;
};

describe('dds-content-item', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-content-item')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          colorScheme: BASIC_COLOR_SCHEME.INVERSE,
          children: html`
            <dds-video-player
              slot="media"
              duration="90"
              name="name-foo"></dds-video-player>
            <dds-content-item-copy>copy-foo</dds-content-item-copy>
            <dds-text-cta slot="footer" cta-type="local">copy-foo</dds-text-cta>
          `,
        }),
        document.body
      );
      await Promise.resolve(); // The update cycle of `<dds-content-item>`
      await Promise.resolve(); // The update cycle that fires `slotchange` event
      await Promise.resolve(); // The update cycle that updates content upon `slotchange` event
      expect(document.body.querySelector('dds-content-item')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
