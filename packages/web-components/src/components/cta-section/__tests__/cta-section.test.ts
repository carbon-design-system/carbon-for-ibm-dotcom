/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import { Simple } from '../__stories__/cta-section.stories';

describe('dds-cta-block', function () {
  it('Renders Default', async function () {
    render(Simple({ parameters: {} }), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-cta-block')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
