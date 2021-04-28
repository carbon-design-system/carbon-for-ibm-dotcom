/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
/* eslint-disable import/no-duplicates */
import { VIDEO_PLAYER_CONTENT_STATE, VIDEO_PLAYER_PLAYING_MODE } from '../video-player';
// Above import is interface-only ref and thus code won't be brought into the build
import '../video-player';
/* eslint-enable import/no-duplicates */

const template = (props?) => {
  const { contentState, duration, formatCaption, formatDuration, hideCaption, name, thumbnailUrl, videoId, playingMode } =
    props ?? {};
  return html`
    <dds-video-player
      content-state="${ifNonNull(contentState)}"
      duration="${ifNonNull(duration)}"
      ?hide-caption="${hideCaption}"
      name="${ifNonNull(name)}"
      thumbnail-url="${ifNonNull(thumbnailUrl)}"
      video-id="${ifNonNull(videoId)}"
      .formatCaption="${ifNonNull(formatCaption)}"
      .formatDuration="${ifNonNull(formatDuration)}"
      .playingMode="${ifNonNull(playingMode)}"
    >
    </dds-video-player>
  `;
};

describe('dds-video-player', function() {
  it('should render with minimum attributes', async function() {
    render(
      template({
        thumbnailUrl: 'about:blank',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('should render with various attributes', async function() {
    render(
      template({
        contentState: VIDEO_PLAYER_CONTENT_STATE.VIDEO,
        playingMode: VIDEO_PLAYER_PLAYING_MODE.INLINE,
        duration: 30,
        name: 'video-name-foo',
        videoId: 'video-id-foo',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('should support hiding the caption', async function() {
    render(
      template({
        hideCaption: true,
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')!.shadowRoot!.querySelector('.bx--video-player__video-caption')).toBeNull();
  });

  it('should support custom caption/duration formatter for localization', async function() {
    render(
      template({
        duration: 60,
        name: 'video-name-foo',
        formatCaption({ duration, name }: { duration?: string; name: string }) {
          return `${name}-${duration}`;
        },
        formatDuration({ duration }: { duration?: number }) {
          return `${duration! / 60000}`;
        },
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')!.getAttribute('aria-label')).toBe('video-name-foo-1');
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});
