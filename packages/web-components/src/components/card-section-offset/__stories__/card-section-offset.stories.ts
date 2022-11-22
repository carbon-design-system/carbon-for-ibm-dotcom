/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import { CTA_TYPE } from '../../cta/defs';
import image from '../../../../../storybook-images/assets/card-section-offset/background-media.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const knobNamesForType = {
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-eyebrow>Label</dds-card-eyebrow>
    <dds-card-heading
      >Lorem ipsum dolor sit amet, pro graeco tibique an</dds-card-heading
    >
    <p>
      Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis
      democritum ex. Illud ullum graecis
    </p>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = (args) => {
  const { heading, cards, ctaType, ctaCopy, download, href, alt, defaultSrc } =
    args?.CardSectionOffset ?? {};
  return html`
    <dds-card-section-offset>
      <dds-background-media
        gradient-direction="left-to-right"
        mobile-position="top"
        alt="${ifNonNull(alt)}"
        default-src="${ifNonNull(defaultSrc)}">
      </dds-background-media>
      <dds-content-block-heading slot="heading"
        >${heading}</dds-content-block-heading
      >
      <dds-text-cta
        slot="action"
        icon-placement="right"
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(download)}"
        href="${ifNonNull(href)}">
        ${ctaCopy}
      </dds-text-cta>
      <dds-card-group slot="card-group" cards-per-row="2">
        <dds-card-group-item empty></dds-card-group-item>${cards}
      </dds-card-group>
    </dds-card-section-offset>
  `;
};

export default {
  title: 'Components/Card section offset',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <dds-video-cta-container> ${story()} </dds-video-cta-container>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      CardSectionOffset: () => {
        const ctaType = select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL);
        const ctaCopy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Copy text', 'Lorem ipsum dolor sit amet');
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable(
                'Download target (download)',
                'IBM_Annual_Report_2019.pdf'
              );
        return {
          heading: 'Aliquam condimentum interdum',
          ctaCopy,
          ctaType,
          download,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          cards: Array.from({
            length: 3,
          }).map(() => defaultCardGroupItem),
          alt: textNullable('Alt text', 'Image alt text'),
          defaultSrc: textNullable('Default image (default-src)', image),
        };
      },
    },
    propsSet: {
      default: {
        CardSectionOffset: {
          heading: 'Aliquam condimentum interdum',
          ctaCopy: 'Lorem ipsum dolor sit amet',
          ctaType: 'local',
          download: undefined,
          href: 'https://www.example.com',
          cards: [
            defaultCardGroupItem,
            defaultCardGroupItem,
            defaultCardGroupItem,
          ],
          alt: 'Image alt text',
          defaultSrc: image,
        },
      },
    },
  },
};
