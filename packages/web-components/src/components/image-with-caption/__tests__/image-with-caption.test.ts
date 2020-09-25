/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../image-with-caption';
import { Default } from '../__stories__/image-with-caption.stories.ts';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-image-with-caption': props,
      },
    },
  });

describe('dds-image-with-caption', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-image-with-caption>`
      expect(document.body.querySelector('dds-image-with-caption')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          defaultSrc: 'https://dummyimage.com/672x336/ee5396/161616&text=2x1',
          alt: 'Image alt text',
          copy: 'Lorem ipsum dolor sit amet',
          heading: 'This is a heading',
          lightbox: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-image-with-caption>`
      expect(document.body.querySelector('dds-image-with-caption')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
