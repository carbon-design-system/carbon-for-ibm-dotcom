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
import '../text-cta';

const template = (props?) => {
  const { ctaType, target, videoDuration, videoName, videoThumbnailUrl, formatVideoCaption, formatVideoDuration, children } =
    props ?? {};
  return html`
    <dds-text-cta
      cta-type="${ifDefined(ctaType)}"
      target="${ifDefined(target)}"
      video-duration="${ifDefined(videoDuration)}"
      video-name="${ifDefined(videoName)}"
      video-thumbnail-url="${ifDefined(videoThumbnailUrl)}"
      .formatVideoCaption="${ifDefined(formatVideoCaption)}"
      .formatVideoDuration="${ifDefined(formatVideoDuration)}"
    >
      ${children}
    </dds-text-cta>
  `;
};

describe('dds-text-cta', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-text-cta')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          ctaType: CTA_TYPE.VIDEO,
          target: '_blank',
          videoDuration: 180,
          videoName: 'video-name-foo',
          videoThumbnailUrl: 'https://example.com/video-thumbnail-foo',
          formatVideoCaption: ({ name }) => `${name}-caption`,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('dds-text-cta')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
