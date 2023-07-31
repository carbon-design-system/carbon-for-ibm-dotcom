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
import '../tag-group';
import '../../tag-link/tag-link';

const template = (props?) => {
  const { copy, href } = props ?? {};
  return html`
    <dds-tag-group>
      <dds-tag-link href="${ifDefined(href)}"> ${copy} </dds-tag-link>
      <dds-tag-link href="${ifDefined(href)}"> ${copy} </dds-tag-link>
    </dds-tag-group>
  `;
};

describe('dds-tag-group', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-tag-group>`
      expect(document.body.querySelector('dds-tag-group')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          copy: 'copy-foo',
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-tag-group>`
      expect(document.body.querySelector('dds-tag-group')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });
  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
