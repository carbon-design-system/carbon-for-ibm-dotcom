/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../logo-grid';
import '../logo-grid-item';
import { Default } from '../__stories__/logo-grid.stories';

const template = (args?) =>
  Default({
    'hide-border': true,
    ...args,
  });

describe('dds-logo-grid', function () {
  it('renders dds-logo-grid properly', async function () {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<dds-button-group>`
    expect(document.body.querySelector('dds-logo-grid')).toMatchSnapshot({
      mode: 'shadow',
    });
  });
  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
