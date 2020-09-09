/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CARD_CTA_IMAGE, CTA_STYLE, CTA_TYPE } from '../cta-composite';
import '../cta-container';
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

const footerKnobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (item.href)',
  [CTA_TYPE.LOCAL]: 'Content link href (item.href)',
  [CTA_TYPE.JUMP]: 'Anchor href (item.href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (item.href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (item.href)',
  [CTA_TYPE.VIDEO]: 'Video ID (item.href)',
};

const styles = {
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
  [`Card (${CTA_STYLE.CARD})`]: CTA_STYLE.CARD,
  [`Feature (${CTA_STYLE.FEATURE})`]: CTA_STYLE.FEATURE,
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
  const { ctaStyle, item } = parameters?.props?.CTAContainer ?? {};
  return html`
    <dds-cta-container cta-style="${ctaStyle}" .item="${item}"></dds-cta-container>
  `;
};

export default {
  title: 'Components/CTA',
  decorators: [
    (story, { parameters }) => {
      const { ctaStyle } = parameters?.props?.CTAContainer ?? {};
      const colExtraClasses = ctaStyle === CTA_STYLE.CARD ? 'bx--col-md-4 bx--col-lg-4' : 'bx--col-lg-8';
      const classes = classMap({
        'bx--grid': true,
        // For cards, we want to ensure the card takes up the entire width of the grid column.
        // Also, feature card has `position:absolute` in `<a>` that contains its contents.
        // `margin-left: auto`/`margin-right: auto` in `.bx--grid`
        // (as well as `flex-direction: column; align-items: center` in `.dds-ce-demo-devenv--container`)
        // seems to be hostile to such styling strategy
        'dds-ce-demo-devenv--grid--card': ctaStyle === CTA_STYLE.CARD || ctaStyle === CTA_STYLE.FEATURE,
      });
      return html`
        <div class="${classes}">
          <div class="bx--row dds-ce-demo-devenv--grid-row">
            <div class="bx--col-sm-4 ${colExtraClasses}">
              ${story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      CTAContainer: ({ groupId }) => {
        const ctaStyle = select('Style (cta-style)', styles, CTA_STYLE.TEXT, groupId);
        const type = select('Type (item.type)', types, null, groupId);
        const href = textNullable(knobNamesForType[type ?? CTA_TYPE.REGULAR], hrefsForType[type ?? CTA_TYPE.REGULAR], groupId);
        const copy =
          type === CTA_TYPE.VIDEO ? undefined : textNullable('Copy text (item.copy)', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          type !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (item.download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const hasImage = ctaStyle === CTA_STYLE.FEATURE && type !== CTA_TYPE.VIDEO;
        const image: CARD_CTA_IMAGE | undefined = !hasImage
          ? undefined
          : {
              alt: 'Image alt text',
              defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
            };
        const hasFooter = ctaStyle === CTA_STYLE.CARD || ctaStyle === CTA_STYLE.FEATURE;
        // Re-using choices list for more than one Storybook select knob seems to cause an error
        const footer = !hasFooter
          ? undefined
          : {
              href: textNullable(
                footerKnobNamesForType[type ?? CTA_TYPE.REGULAR],
                hrefsForType[type ?? CTA_TYPE.REGULAR],
                groupId
              ),
              copy: textNullable('Footer copy text (item.footer.copy)', '', groupId),
              download:
                type !== CTA_TYPE.DOWNLOAD
                  ? undefined
                  : textNullable('Download target (item.footer.download)', 'IBM_Annual_Report_2019.pdf', groupId),
            };
        const item = {
          copy,
          download,
          type,
          href,
          image,
          footer,
        };
        return {
          ctaStyle,
          item,
        };
      },
    },
  },
};
