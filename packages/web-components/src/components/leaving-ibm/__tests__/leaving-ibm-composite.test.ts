/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import C4DLeavingIbmComposite from '../leaving-ibm-composite';
import '../leaving-ibm-composite';

const template = (props?) => {
  const { open, href } = props ?? {};
  return html`
    <c4d-leaving-ibm-composite ?open=${open} href="${href}">
    </c4d-leaving-ibm-composite>
  `;
};

describe('c4d-leaving-ibm-composite', function () {
  it('should render modal body', async function () {
    render(
      template({ open: true, href: 'http://www.example.com' }),
      document.body
    );
    await Promise.resolve();

    expect(
      document.querySelector(
        'c4d-leaving-ibm-composite'
      ) as C4DLeavingIbmComposite
    ).toMatchSnapshot();
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});
