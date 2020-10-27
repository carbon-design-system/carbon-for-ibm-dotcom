/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { Default } from '../__stories__/callout-with-media.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-callout-with-media': props,
      },
    },
  });

describe('dds-callout-with-media', function() {
  it('Renders as expected', async function() {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-callout-with-media')).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
