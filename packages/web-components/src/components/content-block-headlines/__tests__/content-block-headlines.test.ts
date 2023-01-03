/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../../content-item/content-item-copy';
import '../content-block-headlines';
import '../content-block-headlines-item';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-block-headlines> ${children} </dds-content-block-headlines>
  `;
};

describe('dds-content-block-headlines', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-headlines')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
