/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CTA_TYPE } from '../defs';

export const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.NEW_TAB]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
  [CTA_TYPE.PDF]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.BLOG]: 'https://www.example.com',
};

export const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.NEW_TAB]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
  [CTA_TYPE.PDF]: 'Download link href (href)',
  [CTA_TYPE.BLOG]: 'Content link href (href)',
};

export const footerKnobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.NEW_TAB]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
  [CTA_TYPE.PDF]: 'Download link href (href)',
  [CTA_TYPE.BLOG]: 'Content link href (href)',
};

export const typeOptions = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`New Tab (${CTA_TYPE.NEW_TAB})`]: CTA_TYPE.NEW_TAB,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
  [`PDF (${CTA_TYPE.PDF})`]: CTA_TYPE.PDF,
  [`Blog (${CTA_TYPE.BLOG})`]: CTA_TYPE.BLOG,
};

export const types = {
  [CTA_TYPE.REGULAR]: CTA_TYPE.REGULAR,
  [CTA_TYPE.LOCAL]: CTA_TYPE.LOCAL,
  [CTA_TYPE.JUMP]: CTA_TYPE.JUMP,
  [CTA_TYPE.EXTERNAL]: CTA_TYPE.EXTERNAL,
  [CTA_TYPE.NEW_TAB]: CTA_TYPE.NEW_TAB,
  [CTA_TYPE.DOWNLOAD]: CTA_TYPE.DOWNLOAD,
  [CTA_TYPE.VIDEO]: CTA_TYPE.VIDEO,
  [CTA_TYPE.PDF]: CTA_TYPE.PDF,
  [CTA_TYPE.BLOG]: CTA_TYPE.BLOG,
};
