/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ArrowRight20 from '@carbon/carbon-web-components/es/icons/arrow--right/20';
import '../index';

const template = (props?) => {
  const { heading, cards, contentItemHeading, contentItemCopy } = props ?? {};
  return html`
    <dds-content-block-card-static>
      <dds-card-group-item>${heading}</dds-card-group-item>
      <dds-card-group>${cards}</dds-card-group>
      <dds-content-item>
        <dds-content-item-heading
          >${contentItemHeading}</dds-content-item-heading
        >
        <dds-content-item-copy>${contentItemCopy}</dds-content-item-copy>
      </dds-content-item>
      <dds-button-group>
        <dds-button-group-item>Button 1</dds-button-group-item>
        <dds-button-group-item>Buuton 2</dds-button-group-item>
      </dds-button-group>
    </dds-content-block-card-static>
  `;
};

describe('dds-content-block-card-static', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-card-static')
      ).toMatchSnapshot();
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'heading-foo',
          cards: html`
            <dds-card-group-item href="https://example.com">
              <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                et ultricies est. Mauris iaculis eget dolor nec hendrerit.
                Phasellus at elit sollicitudin, sodales nulla quis, consequat
                libero.
              </p>
              <dds-card-cta-footer slot="footer">
                ${ArrowRight20({ slot: 'icon' })}
              </dds-card-cta-footer>
            </dds-card-group-item>
          `,
          contentItemHeading: 'Lorem ipsum',
          contentItemCopy: 'ipsum dolor sit amet',
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-block-card-static')
      ).toMatchSnapshot();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
