/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../card';
import { Default } from '../__stories__/card.stories';

const template = (props?) =>
  Default({
    'dds-card': props,
  });

describe('dds-card', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-card>`
      expect(document.body.querySelector('dds-card')).toMatchSnapshot({
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
      await Promise.resolve(); // Update cycle for `<dds-card>`
      expect(document.body.querySelector('dds-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
