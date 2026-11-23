/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit/html.js';
import { html } from 'lit/html.js';
import '../link-list-item';
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

  it('should apply split layout class when end type has 4 items (regression)', async function () {
    render(
      html`
        <c4d-link-list type="end">
          <c4d-link-list-item href="https://example.com">1</c4d-link-list-item>
          <c4d-link-list-item href="https://example.com">2</c4d-link-list-item>
          <c4d-link-list-item href="https://example.com">3</c4d-link-list-item>
          <c4d-link-list-item href="https://example.com">4</c4d-link-list-item>
        </c4d-link-list>
      `,
      document.body
    );
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    const linkList = document.body.querySelector('c4d-link-list');
    const ul = linkList?.shadowRoot?.querySelector('ul');
    expect(ul?.classList.contains('c4d-ce--link-list__list--split')).toBe(true);
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
