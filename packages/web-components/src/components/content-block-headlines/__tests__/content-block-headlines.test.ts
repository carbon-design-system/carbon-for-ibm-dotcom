/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../../content-item/content-item-copy';
import '../content-block-headlines';
import '../content-block-headlines-item';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-block-headlines> ${children} </c4d-content-block-headlines>
  `;
};

describe('c4d-content-block-headlines', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-block-headlines')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
