/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_STYLE, CTA_TYPE } from '../cta-container';
import readme from './README.stories.mdx';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '0_uka1msg4',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (item.href)',
  [CTA_TYPE.LOCAL]: 'Content link href (item.href)',
  [CTA_TYPE.JUMP]: 'Anchor href (item.href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (item.href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (item.href)',
  [CTA_TYPE.VIDEO]: 'Video ID (item.href)',
};

const styles = {
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
};

const types = {
  'Regular type': null,
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

export const Default = ({ parameters }) => {
  const { ctaStyle, item } = parameters?.props?.['dds-cta-container'] ?? {};
  return html`
    <dds-cta-container cta-style="${ctaStyle}" .item="${item}"></dds-cta-container>
  `;
};

export default {
  title: 'Components/CTA',
  decorators: [
    story =>
      html`
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
              ${story()}
            </div>
          </div>
        </div>
      `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-cta-container': ({ groupId }) => {
        const ctaStyle = select('Style (cta-style)', styles, CTA_STYLE.TEXT, groupId);
        const type = select('Type (item.type)', types, null, groupId);
        const href = textNullable(knobNamesForType[type ?? CTA_TYPE.REGULAR], hrefsForType[type ?? CTA_TYPE.REGULAR], groupId);
        const copy = textNullable('Copy text (item.copy)', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          type !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (item.download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const item = {
          copy,
          download,
          type,
          href,
        };
        return {
          ctaStyle,
          item,
        };
      },
    },
  },
};
