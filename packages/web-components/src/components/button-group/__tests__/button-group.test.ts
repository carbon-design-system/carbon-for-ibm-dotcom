/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../button-group';
import '../button-group-item';
import { Default } from '../__stories__/button-group.stories';

const template = () =>
  Default({
    ButtonGroup: {
      buttons: [
        {
          href: 'https://example.com',
          copy: 'Lorem Ipsum',
        },
        {
          href: 'https://example.com',
          copy: 'Lorem Ipsum',
        },
      ],
    },
  });

const templateItem = () =>
  html`
    <c4d-button-group-item href="https://example.com">
      Testing
    </c4d-button-group-item>
  `;

describe('c4d-button-group', function () {
  it('renders c4d-button-group properly', async function () {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<c4d-button-group>`
    expect(document.body.querySelector('c4d-button-group')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  it('renders c4d-button-group-item properly', async function () {
    render(templateItem(), document.body);
    await Promise.resolve();
    expect(
      document.body.querySelector('c4d-button-group-item')
    ).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
