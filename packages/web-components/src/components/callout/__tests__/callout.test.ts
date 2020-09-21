/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../callout.scss';

const template = () => html`
  <dds-callout>
    <h1>Hey testing!</h1>
  </dds-callout>
`;

describe('dds-callout', function() {
  it('renders properly', async function() {
    await render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-callout')).toMatchSnapshot({ mode: 'shadow' });
  });
  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
