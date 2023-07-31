/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import '../tabs-extended-media';

const template = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-tabs-extended-media> ${children} </dds-tabs-extended-media>
  `;
};

describe('dds-tabs-extended-media', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-tabs-extended-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          copy: 'copy-foo',
          children: html``,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-tabs-extended-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
