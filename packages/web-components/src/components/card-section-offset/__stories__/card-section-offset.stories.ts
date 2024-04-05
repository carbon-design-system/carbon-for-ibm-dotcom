/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import { GRID_MODE } from '../../card-group/defs';
import { CTA_TYPE } from '../../cta/defs';
import image from '../../../../.storybook/storybook-images/assets/card-section-offset/background-media.jpg';
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
  [CTA_TYPE.VIDEO]: '0_ibuqxqbe',
};

const knobNamesForType = {
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const gridModes = {
  [`Condensed (1px)`]: GRID_MODE.CONDENSED,
  [`Narrow (16px)`]: GRID_MODE.NARROW,
  [`Default (32px)`]: GRID_MODE.DEFAULT,
};

const defaultCardGroupItem = html`
  <c4d-card-group-item href="https://example.com">
    <c4d-card-eyebrow>Label</c4d-card-eyebrow>
    <c4d-card-heading
      >Lorem ipsum dolor sit amet, pro graeco tibique an</c4d-card-heading
    >
    <p>
      Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis
      democritum ex. Illud ullum graecis
    </p>
    <c4d-card-footer> ${ArrowRight20({ slot: 'icon' })} </c4d-card-footer>
  </c4d-card-group-item>
`;

export const Default = (args) => {
  const {
    heading,
    cards,
    ctaType,
    ctaCopy,
    download,
    gridMode,
    href,
    alt,
    defaultSrc,
  } = args?.CardSectionOffset ?? {};
  return html`
    <c4d-card-section-offset>
      <c4d-background-media
        gradient-direction="left-to-right"
        slot="image-top"
        alt="${ifDefined(alt)}"
        default-src="${ifDefined(defaultSrc)}">
      </c4d-background-media>
      <c4d-content-block-heading slot="heading"
        >${heading}</c4d-content-block-heading
      >
      <c4d-text-cta
        slot="action"
        icon-placement="right"
        cta-type="${ifDefined(ctaType)}"
        download="${ifDefined(download)}"
        href="${ifDefined(href)}">
        ${ctaCopy}
      </c4d-text-cta>
      <c4d-card-group
        slot="card-group"
        cards-per-row="2"
        grid-mode="${gridMode}">
        ${cards}
      </c4d-card-group>
    </c4d-card-section-offset>
  `;
};

export default {
  title: 'Components/Card section offset',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <c4d-video-cta-container> ${story()} </c4d-video-cta-container>
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
        const gridMode = select(
          'Grid mode:',
          gridModes,
          gridModes['Default (32px)']
        );
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
          gridMode,
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
