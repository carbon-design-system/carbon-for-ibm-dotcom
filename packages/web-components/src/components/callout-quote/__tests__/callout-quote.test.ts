/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import { Default } from '../__stories__/callout-quote.stories';

const template = (props?) =>
  Default({
    'c4d-callout-quote': props,
  });

describe('c4d-callout-quote', function () {
  it('Renders as expected', async function () {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('c4d-callout-quote')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
