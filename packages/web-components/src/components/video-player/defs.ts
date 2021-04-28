/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Video player's content state.
 */
export enum VIDEO_PLAYER_CONTENT_STATE {
  /**
   * A state showing thumbnail.
   */
  THUMBNAIL = 'thumbnail',

  /**
   * A state showing/playing the video.
   */
  VIDEO = 'video',
}

/**
 * Video player's playing mode.
 */
export enum VIDEO_PLAYER_PLAYING_MODE {
  /**
   * Plays video inline.
   */
  INLINE = 'inline',
  /**
   * Plays video in light box.
   */
  LIGHTBOX = 'lightbox',
}
