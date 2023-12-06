/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../horizontal-rule';

const template = (props?) => {
  const { type, size, weight, contrast } = props ?? {};
  return html`
    <c4d-hr
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      weight="${ifDefined(weight)}"
      contrast="${ifDefined(contrast)}"></c4d-hr>
  `;
};

describe('c4d-hr', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-hr>`
      expect(document.body.querySelector('c4d-hr')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({ size: 'small', type: 'solid', weight: 'thin' }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-hr>`
      expect(document.body.querySelector('c4d-hr')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with other various attributes', async function () {
      render(
        template({
          size: 'fluid',
          type: 'dashed',
          contrast: 'medium-contrast',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-hr>`
      expect(document.body.querySelector('c4d-hr')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
