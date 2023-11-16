/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import {
  Default,
  Horizontal,
  Vertical,
} from '../__stories__/link-list.stories';

describe('c4d-link-list', function () {
  it('Renders Default', async function () {
    render(Default({ parameters: {} }), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('c4d-link-list')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  it('Renders Horizontal', async function () {
    render(
      Horizontal({
        parameters: {
          props: {
            'c4d-link-list': {
              iconPlacement: 'left',
            },
          },
        },
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.body.querySelector('c4d-link-list')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  it('Renders Vertical', async function () {
    render(
      Vertical({
        parameters: {
          props: {
            'c4d-link-list': {
              iconPlacement: 'left',
            },
          },
        },
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.body.querySelector('c4d-link-list')).toMatchSnapshot({
      mode: 'shadow',
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
