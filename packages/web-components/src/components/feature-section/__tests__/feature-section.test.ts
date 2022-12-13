/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../feature-section';
import { Default } from '../__stories__/feature-section.stories';

const template = (props?) =>
  Default({
    'dds-feature-section': props,
  });

describe('dds-feature-section', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-feature-section>`
      expect(
        document.body.querySelector('dds-feature-section')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          mediaAlign: 'right',
          eyebrow: '5 min activity',
          heading: 'Ready when you are',
          copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.',
          alt: 'Image alt text',
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-feature-section>`
      expect(
        document.body.querySelector('dds-feature-section')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
