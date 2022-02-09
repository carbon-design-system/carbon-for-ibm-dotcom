/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import { html } from 'lit-element';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Download20 from 'carbon-web-components/es/icons/download/20.js';
import Launch20 from 'carbon-web-components/es/icons/launch/20.js';
import PlayOutline20 from 'carbon-web-components/es/icons/play--outline/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select, boolean } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CTA_TYPE } from '../defs';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

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
  const { copy, ctaType, download, href, customVideoTitle, customVideoDescription } = parameters?.props?.TextCTA ?? {};
  return html`
    <dds-text-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
    >
      ${copy}
    </dds-text-cta>
  `;
};

Text.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      TextCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL, groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Copy (copy):', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO ? textNullable('Custom video title', 'Custom video title', groupId) : null;

        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video description', 'This is a custom video description', groupId)
            : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
    propsSet: {
      default: {
        TextCTA: {
          copy: 'Lorem ipsum dolor sit amet',
          ctaType: 'local',
          download: undefined,
          customVideoTitle: null,
          customVideoDescription: null,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const Button = ({ parameters }) => {
  const { copy, ctaType, download, href, customVideoTitle, customVideoDescription } = parameters?.props?.ButtonCTA ?? {};
  return html`
    <dds-button-group>
      <dds-button-cta
        cta-type="${ifNonNull(ctaType)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        download="${ifNonNull(download)}"
        href="${href}"
      >
        ${copy}
      </dds-button-cta>
      <dds-button-cta cta-type="${ifNonNull(ctaType)}" download="${ifNonNull(download)}" href="${href}">${copy}</dds-button-cta>
    </dds-button-group>
  `;
};

Button.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      ButtonCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL, groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Copy text', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO ? textNullable('Custom video title', 'Custom video title', groupId) : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video description', 'This is a custom video description', groupId)
            : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
    propsSet: {
      default: {
        ButtonCTA: {
          copy: 'Lorem ipsum dolor sit amet',
          ctaType: 'local',
          download: undefined,
          customVideoTitle: null,
          customVideoDescription: null,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const Card = ({ parameters }) => {
  const {
    heading,
    copy,
    footerCopy,
    ctaType,
    download,
    href,
    footerHref,
    customVideoTitle,
    customVideoDescription,
    footerDownload,
    noPoster,
    thumbnail,
  } = parameters?.props?.CardCTA ?? {};
  return html`
    <dds-card-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      ?no-poster=${noPoster}
      thumbnail="${ifNonNull(thumbnail)}"
    >
      <dds-card-heading>${ctaType !== 'video' ? heading : ''}</dds-card-heading>
      ${ctaType !== 'video' ? copy : ''}
      <dds-card-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
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
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: ({ groupId }) => {
        const { ctaType } = Text.story.parameters.knobs.TextCTA({ groupId: groupId.replace(/Footer$/, '') });
        const noPoster = ctaType === CTA_TYPE.VIDEO ? boolean('No Video Poster', false, groupId) : null;
        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? null
            : textNullable('Heading (heading):', 'Explore AI use cases in all industries', groupId);
        const thumbnail = ctaType === CTA_TYPE.VIDEO ? textNullable('Custom thumbnail (thumbnail):', '', groupId) : null;
        return {
          ...Text.story.parameters.knobs.TextCTA({ groupId }),
          heading,
          thumbnail,
          footerCopy: textNullable('Footer copy text', '', groupId),
          footerHref: textNullable(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
            groupId
          ),
          noPoster,
          download:
            ctaType !== CTA_TYPE.DOWNLOAD
              ? undefined
              : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId),
        };
      },
    },
    propsSet: {
      default: {
        CardCTA: {
          copy: 'Lorem ipsum dolor sit amet',
          ctaType: 'local',
          download: undefined,
          customVideoTitle: null,
          customVideoDescription: null,
          thumbnail: null,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export const CardLink = ({ parameters }) => {
  const {
    heading,
    copy,
    footerCopy,
    ctaType,
    download,
    footerDownload,
    href,
    footerHref,
    customVideoTitle,
    customVideoDescription,
  } = parameters?.props?.CardCTA ?? {};
  return html`
    <dds-card-link-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
    >
      <dds-card-link-heading>${ctaType !== 'video' ? heading : ''}</dds-card-link-heading>
      ${copy
        ? html`
            <p>${copy}</p>
          `
        : ``}
      <dds-card-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        href="${ifNonNull(footerHref)}"
      >
        ${ctaType === 'local' ? footerCopy || ArrowRight20({ slot: 'icon' }) : ''}
        ${ctaType === 'jump' ? footerCopy || ArrowDown20({ slot: 'icon' }) : ''}
        ${ctaType === 'external' ? footerCopy || Launch20({ slot: 'icon' }) : ''}
        ${ctaType === 'download' ? footerCopy || Download20({ slot: 'icon' }) : ''}
        ${ctaType === 'video' ? footerCopy || PlayOutline20({ slot: 'icon' }) : ''}
      </dds-card-cta-footer>
    </dds-card-link-cta>
  `;
};

CardLink.story = {
  name: 'Card link',
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', types, CTA_TYPE.LOCAL, groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Copy (copy):', '', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? null
            : textNullable('Heading (heading):', 'Explore AI use cases in all industries', groupId);
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO ? textNullable('Custom video title', 'Custom video title', groupId) : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video description', 'This is a custom video description', groupId)
            : null;
        return {
          heading,
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: textNullable(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
          footerCopy: textNullable('Footer copy text', '', groupId),
          footerHref: textNullable(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
            groupId
          ),
          footerDownload:
            ctaType !== CTA_TYPE.DOWNLOAD
              ? undefined
              : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId),
        };
      },
    },
    propsSet: {
      default: {
        CardCTA: {
          heading: 'Explore AI use cases in all industries',
          copy: '',
          download: null,
          customVideoTitle: null,
          customVideoDescription: null,
          thumbnail: null,
          href: `https://www.example.com`,
          footerCopy: '',
          footerHref: `https://www.example.com`,
          footerDownload: '',
        },
      },
    },
  },
};

export const Feature = ({ parameters }) => {
  const { heading, ctaType, download, href, customVideoTitle, customVideoDescription } = parameters?.props?.FeatureCTA ?? {};
  const { copy: footerCopy, download: footerDownload, href: footerHref } = parameters?.props?.FeatureCTAFooter ?? {};
  return html`
    <dds-feature-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
    >
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-image slot="image" alt="Image alt text" default-src="${imgLg1x1}"> </dds-image>
      <dds-feature-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        href="${ifNonNull(footerHref)}"
      >
        ${footerCopy}
      </dds-feature-cta-footer>
    </dds-feature-cta>
  `;
};

Feature.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      FeatureCTA: ({ groupId }) => {
        const ctaType = select('CTA type:', types, CTA_TYPE.LOCAL, groupId);
        const heading =
          ctaType === CTA_TYPE.VIDEO ? undefined : textNullable('Heading', 'Explore AI uses cases in all industries', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD
            ? undefined
            : textNullable('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO ? textNullable('Custom video title', 'Custom video title', groupId) : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video description', 'This is a custom video description', groupId)
            : null;
        return {
          heading,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
        };
      },
    },
    propsSet: {
      default: {
        FeatureCTA: {
          heading: 'Explore AI uses cases in all industries',
          ctaType: 'local',
          download: undefined,
          customVideoTitle: null,
          customVideoDescription: null,
          href: 'https://www.example.com',
        },
      },
    },
  },
};

export default {
  title: 'Components/CTA',
  decorators: [
    (story, { parameters }) => {
      return html`
        <div class="bx--grid">
          <div class="bx--row">
            <div class="${parameters.gridContentClasses}">
              <dds-video-cta-container>
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
    hasStoryPadding: true,
  },
};
