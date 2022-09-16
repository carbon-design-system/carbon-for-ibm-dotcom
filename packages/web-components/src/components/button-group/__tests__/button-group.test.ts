/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, html } from 'lit-html';
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
    <dds-button-group-item href="https://example.com">
      Testing
    </dds-button-group-item>
  `;

describe('dds-button-group', function() {
  it('renders dds-button-group properly', async function() {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<dds-button-group>`
    expect(document.body.querySelector('dds-button-group')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('renders dds-button-group-item properly', async function() {
    render(templateItem(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-button-group-item')).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
