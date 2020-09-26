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
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { CTA_TYPE } from '../shared-enums';
import '../video-cta-container';
import '../card-cta';
import '../card-cta-footer';
import '../feature-cta';
import '../feature-cta-footer';
import '../text-cta';
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
  'Regular type': null,
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
        const ctaType = select('CTA type (cta-type)', types, null, groupId);
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
      ${copy}
      <dds-card-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        href="${ifNonNull(footerHref)}"
      >
        ${footerCopy}
      </dds-card-cta-footer>
    </dds-card-cta>
  `;
};

Card.story = {
  parameters: {
    useGridForCard: true,
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
      ${copy}
      <dds-image slot="image" alt="Image alt text" default-src="https://dummyimage.com/672x672/ee5396/161616&text=1x1">
      </dds-image>
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
    useGridForCard: true,
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
      const { useGridForCard } = parameters ?? {};
      const colExtraClasses = useGridForCard ? 'bx--col-md-4 bx--col-lg-4' : 'bx--col-lg-8';
      const classes = classMap({
        'bx--grid': true,
        // For cards, we want to ensure the card takes up the entire width of the grid column.
        // Also, feature card has `position:absolute` in `<a>` that contains its contents.
        // `margin-left: auto`/`margin-right: auto` in `.bx--grid`
        // (as well as `flex-direction: column; align-items: center` in `.dds-ce-demo-devenv--container`)
        // seems to be hostile to such styling strategy
        'dds-ce-demo-devenv--grid--card': useGridForCard,
      });
      return html`
        <dds-video-cta-container class="${classes}">
          <div class="bx--row dds-ce-demo-devenv--grid-row">
            <div class="bx--col-sm-4 ${colExtraClasses}">
              ${story()}
            </div>
          </div>
        </dds-video-cta-container>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
};
