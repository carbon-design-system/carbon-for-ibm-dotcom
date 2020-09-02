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
import '../icon';

const template = (props?) => {
  const { href } = props ?? {};
  return html`
    <dds-icon href="${ifNonNull(href)}"></dds-icon>
  `;
};

describe('dds-icon', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-masthead-logo>`
      expect(document.body.querySelector('dds-icon')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(template({ href: 'https://cloud.ibm.com/' }), document.body);
      await Promise.resolve(); // Update cycle for `<dds-masthead-logo>`
      expect(document.body.querySelector('dds-icon')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
