/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { Default } from '../__stories__/link-list-section.stories';

describe('dds-link-list-section', function () {
  it('Renders properly', async function () {
    render(Default({ parameters: {} }), document.body);
    await Promise.resolve();
    expect(
      document.body.querySelector('dds-link-list-section')
    ).toMatchSnapshot({ mode: 'shadow' });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
