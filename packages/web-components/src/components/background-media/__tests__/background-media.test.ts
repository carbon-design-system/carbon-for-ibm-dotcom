/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../index';
import { Default } from '../__stories__/background-media.stories';

const template = (props?) =>
  Default({
    'dds-background-media': props,
  });

describe('dds-background-media', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-background-media>`
      expect(
        document.body.querySelector('dds-background-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          gradientDirection: 'left-to-right',
          mobilePosition: 'top',
          alt: 'Image alt text',
          defaultSrc:
            'https://fpoimg.com/1584x560?&bg_color=ee5396&text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-background-media>`
      expect(
        document.body.querySelector('dds-background-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
