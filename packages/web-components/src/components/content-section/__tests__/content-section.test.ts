/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../content-section';
import '../content-section-heading';
import '../content-section.scss?lit';

const template = () => html`
  <c4d-content-section>
    <c4d-content-section-heading
      >Natural Language Processing.</c4d-content-section-heading
    >
    <p>This is a test.</p>
  </c4d-content-section>
`;

describe('c4d-content-section', function () {
  it('renders properly', async function () {
    await render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('c4d-content-section')).toMatchSnapshot({
      mode: 'shadow',
    });
  });
  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
