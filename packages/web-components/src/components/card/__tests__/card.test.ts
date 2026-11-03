/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../card';
import '../card-footer';
import { Default } from '../__stories__/card.stories';

const template = (props?) =>
  Default({
    'c4d-card': props,
  });

describe('c4d-card', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-card>`
      expect(document.body.querySelector('c4d-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          eyebrow: 'Eyebrow text',
          heading: 'Lorem ipsum dolor sit amet',
          copy: '',
          defaultSrc:
            'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
          alt: 'Image alt text',
          href: 'https://example.com',
          footer: 'Card CTA text',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-card>`
      expect(document.body.querySelector('c4d-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should unhide copy wrapper in card footer when copy is slotted (regression)', async function () {
      render(
        html`<c4d-card-footer>Card footer copy</c4d-card-footer>`,
        document.body
      );
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      const footer = document.body.querySelector('c4d-card-footer');
      const copySpan = footer?.shadowRoot?.querySelector('span[part="copy"]');
      expect(copySpan?.hasAttribute('hidden')).toBe(false);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
