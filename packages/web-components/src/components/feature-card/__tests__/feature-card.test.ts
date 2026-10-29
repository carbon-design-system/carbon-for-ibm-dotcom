/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../feature-card';
import { Medium } from '../__stories__/feature-card.stories';

const template = (props?) =>
  Medium({
    'c4d-feature-card': props,
  });

describe('c4d-feature-card', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-feature-card>`
      expect(document.body.querySelector('c4d-feature-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'Explore AI use cases in all industries',
          defaultSrc:
            'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
          alt: 'Image alt text',
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-feature-card>`
      expect(document.body.querySelector('c4d-feature-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('disable-image-zoom attribute', function () {
    it('should not have disable-image-zoom attribute by default', async function () {
      render(
        template({
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document
          .querySelector('c4d-feature-card')!
          .hasAttribute('disable-image-zoom')
      ).toBe(false);
    });

    it('should reflect disable-image-zoom attribute when disableImageZoom is true', async function () {
      render(
        template({
          href: 'https://example.com',
          disableImageZoom: true,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document
          .querySelector('c4d-feature-card')!
          .hasAttribute('disable-image-zoom')
      ).toBe(true);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
