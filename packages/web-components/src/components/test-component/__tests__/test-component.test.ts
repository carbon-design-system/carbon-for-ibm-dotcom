/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../test-component';

const template = () => {
    return html`
      <dds-test-component>
        <h2>Hey</h2>
      </dds-test-component>
    `;
  };

describe('dds-test-component', function() {
  it('renders dds-test-component properly', async function() {
    render(template(), document.body);
    await Promise.resolve(); //Update cycle
    console.log('dds-test-component', document.body.querySelector('dds-test-component'))
    expect(document.body.querySelector('dds-test-component')).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});