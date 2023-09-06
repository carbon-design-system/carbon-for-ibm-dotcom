/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../quote';
import { Default } from '../__stories__/quote.stories';

const template = (props?) =>
  Default({
    LinkWithIcon: props,
  });

describe('c4d-quote', function () {
  it('renders c4d-quote properly', async function () {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<c4d-button-group>`
    expect(document.body.querySelector('c4d-quote')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
