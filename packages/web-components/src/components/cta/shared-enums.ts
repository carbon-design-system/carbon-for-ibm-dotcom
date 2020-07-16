/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * CTA style.
 */
export enum CTA_STYLE {
  /**
   * Text CTA that uses `<dds-link-with-icon>`.
   */
  TEXT = 'text',
}

/**
 * CTA type.
 */
export enum CTA_TYPE {
  /**
   * The default CTA, without icon.
   */
  REGULAR = '',

  /**
   * CTA with a right arrow icon, whose action loads the link in self page.
   */
  LOCAL = 'local',

  /**
   * CTA with a down arrow icon, whose action scrolls the target element into view.
   */
  JUMP = 'jump',

  /**
   * CTA with a launch icon, whose action loads the link in a new tab.
   */
  EXTERNAL = 'external',

  /**
   * CTA with a download icon, whose action downloads a file.
   */
  DOWNLOAD = 'download',

  /**
   * CTA with a play icon, whose action loads a video in a lightbox.
   */
  VIDEO = 'video',
}
