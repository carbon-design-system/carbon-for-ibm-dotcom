/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../tabs-extended';

const template = (props?) => {
  const { children } = props ?? {};
  return html` <dds-tabs-extended> ${children} </dds-tabs-extended> `;
};

describe('dds-tabs-extended', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-tabs-extended')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          orientation: 'horizontal',
          copy: 'copy-foo',
          children: html``,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-tabs-extended')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
