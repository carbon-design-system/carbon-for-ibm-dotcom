/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import '../masthead-logo';

const template = (props?) => {
  const { href } = props ?? {};
  return html`
    <dds-masthead-logo href="${ifNonNull(href)}"></dds-masthead-logo>
  `;
};

describe('dds-masthead-logo', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-masthead-logo>`
      expect(document.body.querySelector('dds-masthead-logo')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(template({ href: 'https://cloud.ibm.com/' }), document.body);
      await Promise.resolve(); // Update cycle for `<dds-masthead-logo>`
      expect(document.body.querySelector('dds-masthead-logo')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
