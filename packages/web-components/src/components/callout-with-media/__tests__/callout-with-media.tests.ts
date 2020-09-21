/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../callout-with-media';
import { Default } from '../__stories__/callout-with-media.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        CalloutWithMedia: props,
      },
    },
  });

describe('dds-callout-with-media', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-callout-with-media>`
      expect(document.body.querySelector('dds-callout-with-media')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          mediaType: 'none',
          heading: 'Lorem ipsum dolor sit amet',
          copy: 'copyText',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-callout-with-media>`
      expect(document.body.querySelector('dds-callout-with-media')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
