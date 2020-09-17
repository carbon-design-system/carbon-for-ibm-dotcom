/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../button-group';
import '../button-group-item';
import { Default } from '../__stories__/button-group.stories';

const template = () =>
  Default({
    parameters: {
      props: {
        ButtonGroup: {
          buttons: [
            {
              href: 'https://example.com',
              copy: 'Lorem Ipsum',
            },
            {
              href: 'https://example.com',
              copy: 'Lorem Ipsum',
            },
          ],
        },
      },
    },
  });

describe('dds-button-group', function() {
  it('renders properly', async function() {
    render(template(), document.body);
    await Promise.resolve(); // Update cycle for `<dds-button-group>`
    expect(document.body.querySelector('dds-button-group')).toMatchSnapshot({ mode: 'shadow' });
    expect(document.body.querySelector('dds-button-group-item')).toMatchSnapshot({ mode: 'shadow' });
  });
});
