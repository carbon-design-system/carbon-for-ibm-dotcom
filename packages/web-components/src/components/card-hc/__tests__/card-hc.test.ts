/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../card-hc';
import { Default } from '../__stories__/card-hc.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-card-hc': props,
      },
    },
  });

describe('dds-card-hc', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-card-hc>`
      expect(document.body.querySelector('dds-card-hc')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          eyebrow: 'eyebrow text',
          heading: 'Lorem ipsum dolor sit amet',
          copy:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          defaultSrc: 'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
          alt: 'Image alt text',
          href: 'https://example.com',
          footer: 'Card cta text',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-card-hc>`
      expect(document.body.querySelector('dds-card-hc')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
