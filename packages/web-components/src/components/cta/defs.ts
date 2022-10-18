/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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

  /**
   * Button CTA that uses `<dds-button>`.
   */
  BUTTON = 'button',

  /**
   * Card CTA that uses `<dds-card>`.
   */
  CARD = 'card',

  /**
   * Card CTA that uses `<dds-card-link>`.
   */
  CARDLINK = 'card-link',

  /**
   * Feature CTA that uses `<dds-feature-card>`.
   */
  FEATURE = 'feature',
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
   * CTA with a new-tab icon, whose action loads the link in a new tab.
   */
  NEW_TAB = 'new tab',

  /**
   * CTA with a download icon, whose action downloads a file.
   */
  DOWNLOAD = 'download',

  /**
   * CTA with a play icon, whose action loads a video in a lightbox.
   */
  VIDEO = 'video',

  /**
   * CTA with a pdf-file icon, whose action downloads a PDF file.
   */
  PDF = 'pdf',

  /**
   * CTA with a blog-content icon, whose action loads the blog post in self page.
   */
  BLOG = 'blog',
}
