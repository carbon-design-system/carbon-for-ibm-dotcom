/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { CTA_TYPE } from '../defs';
import '../card-cta-footer';

const template = (props?) => {
  const {
    ctaType,
    videoDuration,
    formatVideoCaption,
    formatVideoDuration,
    children,
  } = props ?? {};
  return html`
    <dds-card-cta-footer
      cta-type="${ifDefined(ctaType)}"
      video-duration="${ifDefined(videoDuration)}"
      .formatVideoCaption="${ifDefined(formatVideoCaption)}"
      .formatVideoDuration="${ifDefined(formatVideoDuration)}">
      ${children}
    </dds-card-cta-footer>
  `;
};

describe('dds-card-cta-footer', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-card-cta-footer')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoDuration: 180,
          videoName: 'video-name-foo',
          // Should yeild to `undefined` in `name` part given card footer doesn't render the video name
          formatVideoCaption: ({ name, duration }) => `${name}-${duration}`,
          formatVideoDuration: ({ duration }) => duration,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-card-cta-footer')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Overriding the default contents', function () {
    it('should not use the video caption if the content is given', async function () {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          videoDuration: 180,
          videoName: 'video-name-foo',
          children: 'children-foo',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for initial render
      await Promise.resolve(); // Update cycle that fires `slotchange` event
      await Promise.resolve(); // Update cycle for rendering upon `slotchange` event
      expect(
        document.body
          .querySelector('dds-card-cta-footer')!
          .shadowRoot!.querySelector('.bx--card__cta__copy')!
          .textContent!.trim()
      ).toBe('');
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
