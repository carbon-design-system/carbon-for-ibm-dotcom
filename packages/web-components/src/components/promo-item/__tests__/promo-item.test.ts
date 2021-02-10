/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../promo-item';
import { Default } from '../__stories__/promo-item.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        PromoItem: props,
      },
    },
  });

describe('dds-promo-item', function() {
  it('Renders as expected', async function() {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-promo-item')).toMatchSnapshot({ mode: 'shadow' });
  });
  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
