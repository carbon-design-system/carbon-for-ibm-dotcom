/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../quote';
import { Default } from '../__stories__/quote.stories';

const template = (props?) =>
  Default({
    LinkWithIcon: props,
  });

describe('dds-quote', function() {
  it('renders dds-quote properly', async function() {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<dds-button-group>`
    expect(document.body.querySelector('dds-quote')).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
