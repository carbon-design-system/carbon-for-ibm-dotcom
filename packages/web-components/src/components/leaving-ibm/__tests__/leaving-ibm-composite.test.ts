/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';

const template = (props?) => {
  const { open, href } = props ?? {};
  return html`
    <dds-leaving-ibm-container ?open=${open} href="${href}"> </dds-leaving-ibm-container>
  `;
};

describe('dds-leaving-ibm-composite', function() {
  it('should render modal body', async function() {
    render(template(), document.body);
    await Promise.resolve();
    const leavingIbmModal = document.body.querySelector('dds-leaving-ibm-modal');
    expect(leavingIbmModal!.querySelector('dds-leaving-ibm-modal-body')).toMatchSnapshot();
  });

  it('should render modal heading', async function() {
    render(template(), document.body);
    await Promise.resolve();
    const leavingIbmModal = document.body.querySelector('dds-leaving-ibm-modal');
    expect(leavingIbmModal!.querySelector('dds-leaving-ibm-modal-heading')).toMatchSnapshot();
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
