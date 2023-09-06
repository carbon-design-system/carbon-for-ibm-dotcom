/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import '../logo-grid';
import '../logo-grid-item';
import { Default } from '../__stories__/logo-grid.stories';

const template = (props?) =>
  Default({
    LogoGrid: { hideBorder: true, ...props },
  });

describe('c4d-logo-grid', function () {
  it('renders c4d-logo-grid properly', async function () {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<c4d-button-group>`
    expect(document.body.querySelector('c4d-logo-grid')).toMatchSnapshot({
      mode: 'shadow',
    });
  });
  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
