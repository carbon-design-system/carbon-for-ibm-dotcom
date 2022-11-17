/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import DDSLeavingIbmComposite from '../leaving-ibm-composite';
import '../leaving-ibm-composite';

const template = (props?) => {
  const { open, href } = props ?? {};
  return html`
    <dds-leaving-ibm-composite ?open=${open} href="${href}"> </dds-leaving-ibm-composite>
  `;
};

describe('dds-leaving-ibm-composite', function() {
  it('should render modal body', async function() {
    render(template({ open: true, href: 'http://www.example.com' }), document.body);
    await Promise.resolve();

    expect(document.querySelector('dds-leaving-ibm-composite') as DDSLeavingIbmComposite).toMatchSnapshot();
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
