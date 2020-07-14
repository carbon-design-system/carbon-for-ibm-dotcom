/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowRight20 from 'carbon-custom-elements/es/icons/arrow--right/20';
import Error20 from 'carbon-custom-elements/es/icons/error/20';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import '../region-item';

const template = (props?) => {
  const { href, invalid, name } = props ?? {};
  return html`
    <dds-region-item href="${ifNonNull(href)}" ?invalid="${invalid}" name="${ifNonNull(name)}"></dds-region-item>
  `;
};

describe('dds-region-item', function() {
  describe('Misc attributes', function() {
    it('should render with various attributes', async function() {
      render(
        html`
          ${template({ href: 'about:blank', name: 'name-foo' })}${ArrowRight20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve();
      const regionItem = document.body.querySelector('dds-region-item');
      expect(regionItem).toMatchSnapshot({ mode: 'shadow' });
      const icon = regionItem!.shadowRoot!.querySelector('.bx--card__cta');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });

    it('should render with invalid state', async function() {
      render(
        html`
          ${template({ invalid: true, name: 'name-foo' })}${Error20({ id: 'icon-ref' })}
        `,
        document.body
      );
      await Promise.resolve();
      const regionItem = document.body.querySelector('dds-region-item');
      expect(regionItem).toMatchSnapshot({ mode: 'shadow' });
      const icon = regionItem!.shadowRoot!.querySelector('.bx--card__cta');
      const iconRef = document.getElementById('icon-ref');
      expect(icon!.querySelector('path')!.getAttribute('d')).toBe(iconRef!.querySelector('path')!.getAttribute('d'));
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
