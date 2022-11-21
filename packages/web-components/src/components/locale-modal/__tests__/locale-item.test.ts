/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import '../locale-item';

const template = (props?) => {
  const { country, language } = props ?? {};
  return html`
    <dds-locale-item
      country="${ifNonNull(country)}"
      language="${ifNonNull(language)}"
    ></dds-locale-item>
  `;
};

describe('dds-locale-item', function () {
  describe('Misc attributes', function () {
    it('should render with various attributes', async function () {
      render(
        template({ country: 'country-foo', language: 'language-foo' }),
        document.body
      );
      await Promise.resolve();
      const localeItem = document.body.querySelector('dds-locale-item');
      expect(localeItem).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
