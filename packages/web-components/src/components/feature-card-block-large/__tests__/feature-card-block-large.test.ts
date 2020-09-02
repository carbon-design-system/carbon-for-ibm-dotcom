/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../feature-card-block-large';
import { Default } from '../__stories__/feature-card-block-large.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-feature-card-block-large': props,
      },
    },
  });

describe('dds-feature-card-block-large', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-feature-card-block-large>`
      expect(document.body.querySelector('dds-feature-card-block-large')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          heading: 'Explore AI use cases in all industries',
          eyebrow: 'Explore AI use cases in all industries',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
          alt: 'Image alt text',
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-feature-card-block-large>`
      expect(document.body.querySelector('dds-feature-card-block-large')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
