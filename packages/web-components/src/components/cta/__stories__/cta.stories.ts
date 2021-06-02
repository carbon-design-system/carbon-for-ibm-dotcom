/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../video-cta-container';
import '../button-cta';
import '../card-cta';
import '../card-cta-footer';
import '../feature-cta';
import '../feature-cta-footer';
import '../text-cta';
import { classMap } from 'lit-html/directives/class-map';
import { html } from 'lit-element';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Download20 from 'carbon-web-components/es/icons/download/20.js';
import Launch20 from 'carbon-web-components/es/icons/launch/20.js';
import PlayOutline20 from 'carbon-web-components/es/icons/play--outline/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CTA_TYPE } from '../defs';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import styles from './cta.stories.scss';

const hrefsForType = {
  [CTA_TYPE.REGULAR]: 'https://www.example.com',
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]: 'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const knobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const footerKnobNamesForType = {
  [CTA_TYPE.REGULAR]: 'Content link href (href)',
  [CTA_TYPE.LOCAL]: 'Content link href (href)',
  [CTA_TYPE.JUMP]: 'Anchor href (href)',
  [CTA_TYPE.EXTERNAL]: 'Content link href (href)',
  [CTA_TYPE.DOWNLOAD]: 'Download link href (href)',
  [CTA_TYPE.VIDEO]: 'Video ID (href)',
};

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
  [`Download (${CTA_TYPE.DOWNLOAD})`]: CTA_TYPE.DOWNLOAD,
  [`Video (${CTA_TYPE.VIDEO})`]: CTA_TYPE.VIDEO,
};

export const Text = ({ parameters }) => {
  const { copy, ctaType, download, href } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-text-cta cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
      ${copy}
    </dds-text-cta>
  `;
};

Text.story = {
  parameters: {
    knobs: {
      TextCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL, groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Copy text', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        return {
          copy,
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};

export const Button = ({ parameters }) => {
  const { copy, ctaType, download, href } = parameters?.props?.ButtonCTA ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <div class="cta-button-group-container">
      <dds-button-group>
        <dds-button-cta cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${href}">${copy}</dds-button-cta>
        <dds-button-cta cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${href}">${copy}</dds-button-cta>
      </dds-button-group>
    </div>
  `;
};

Button.story = {
  parameters: {
    hasGrid: true,
    knobs: {
      ButtonCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL, groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Copy text', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        return {
          copy,
          ctaType,
          download,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};

export const Card = ({ parameters }) => {
  const { copy, ctaType, download, href } = parameters?.props?.CardCTA ?? {};
  const { copy: footerCopy, download: footerDownload, href: footerHref } = parameters?.props?.CardCTAFooter ?? {};
  return html`
    <dds-card-cta cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
      ${ctaType !== 'video' ? copy : ''}
      <dds-card-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        href="${ifNonNull(footerHref)}"
      >
        ${ctaType === 'local' ? footerCopy || ArrowRight20({ slot: 'icon' }) : ''}
        ${ctaType === 'jump' ? footerCopy || ArrowDown20({ slot: 'icon' }) : ''}
        ${ctaType === 'external' ? footerCopy || Launch20({ slot: 'icon' }) : ''}
        ${ctaType === 'download' ? footerCopy || Download20({ slot: 'icon' }) : ''}
        ${ctaType === 'video' ? footerCopy || PlayOutline20({ slot: 'icon' }) : ''}
      </dds-card-cta-footer>
    </dds-card-cta>
  `;
};

Card.story = {
  parameters: {
    hasGrid: true,
    hasCardGrid: true,
    knobs: {
      CardCTA: ({ groupId }) => Text.story.parameters.knobs.TextCTA({ groupId }),
      CardCTAFooter: ({ groupId }) => {
        const { ctaType } = Text.story.parameters.knobs.TextCTA({ groupId: groupId.replace(/Footer$/, '') });
        return {
          copy: textNullable('Footer copy text', '', groupId),
          href: textNullable(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
            groupId
          ),
          download:
            ctaType !== CTA_TYPE.DOWNLOAD
              ? undefined
              : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId),
        };
      },
    },
  },
};

export const Feature = ({ parameters }) => {
  const { copy, ctaType, download, href } = parameters?.props?.FeatureCTA ?? {};
  const { copy: footerCopy, download: footerDownload, href: footerHref } = parameters?.props?.FeatureCTAFooter ?? {};
  return html`
    <dds-feature-cta cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${ifNonNull(href)}">
      <dds-card-heading>${copy}</dds-card-heading>
      <dds-image slot="image" alt="Image alt text" default-src="${imgLg1x1}"> </dds-image>
      <dds-feature-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        href="${ifNonNull(footerHref)}"
      >
        ${footerCopy}
      </dds-feature-cta-footer>
    </dds-feature-cta>
  `;
};

Feature.story = {
  parameters: {
    hasFeatureCard: true,
    hasGrid: true,
    useRawContainer: true,
    knobs: {
      FeatureCTA: ({ groupId }) => Card.story.parameters.knobs.CardCTA({ groupId }),
      FeatureCTAFooter: ({ groupId }) => Card.story.parameters.knobs.CardCTAFooter({ groupId }),
    },
  },
};

export default {
  title: 'Components/CTA',
  decorators: [
    (story, { parameters }) => {
      const { hasGrid, hasCardGrid, hasFeatureCard } = parameters;
      const classes = classMap({
        'dds-ce-demo-devenv--simple-grid': hasGrid && hasCardGrid,
        'dds-ce-demo-devenv--simple-grid--card': hasGrid,
      });
      return !hasFeatureCard
        ? html`
            <dds-video-cta-container class="${classes}">
              ${story()}
            </dds-video-cta-container>
          `
        : html`
            <div class="bx--grid">
              <div class="bx--row">
                <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
                  <dds-video-cta-container class="${classes}">
                    ${story()}
                  </dds-video-cta-container>
                </div>
              </div>
            </div>
          `;
    },
  ],
  parameters: {
    ...readme.parameters,
  },
};
