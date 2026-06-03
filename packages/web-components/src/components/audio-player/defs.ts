/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Audio player content state.
 */
export enum AUDIO_PLAYER_CONTENT_STATE {
  /**
   * The state where the audio player shows the audio player UI.
   */
  AUDIO = 'audio',

  /**
   * The state where the audio player shows the loading state.
   */
  LOADING = 'loading',
}

/**
 * Audio player playing mode.
 */
export enum AUDIO_PLAYER_PLAYING_MODE {
  /**
   * Inline mode - audio player embedded in the page.
   */
  INLINE = 'inline',
}
