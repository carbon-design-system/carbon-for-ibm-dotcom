/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';

const template = () => {
  return html`
    <dds-callout-data>
      <dds-callout-data-heading>51%</dds-callout-data-heading>
      <dds-callout-data-copy>
        Lorem ipsum
      </dds-callout-data-copy>
      <dds-callout-data-source>
        Duis aute irure
      </dds-callout-data-source>
    </dds-callout-data>
  `;
};

describe('dds-callout-data', function() {
  it('Renders as expected', async function() {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-callout-data')).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
