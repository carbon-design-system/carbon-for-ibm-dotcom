/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../video-cta-container';
import '../button-cta';
import '../card-link-cta';
import '../card-cta';
import '../card-cta-footer';
import '../feature-cta';
import '../feature-cta-footer';
import '../text-cta';
import '../../button-group/index';
import { html } from 'lit';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select, boolean } from '@storybook/addon-knobs';
import { icons as ctaIcons } from '../../../component-mixins/cta/cta';
// eslint-disable-next-line sort-imports
import { CTA_TYPE } from '../defs';
import {
  hrefsForType,
  knobNamesForType,
  footerKnobNamesForType,
  typeOptions,
  types,
} from './ctaTypeConfig';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Text = (args) => {
  const {
    copy,
    ctaType,
    download,
    href,
    customVideoTitle,
    customVideoDescription,
  } = args?.TextCTA ?? {};
  return html`
    <dds-text-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}">
      ${copy}
    </dds-text-cta>
  `;
};

Text.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      TextCTA: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );
        const copy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Copy (copy):', 'Lorem ipsum dolor sit amet');
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;

        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable(
                'Custom video description',
                'This is a custom video description'
              )
            : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
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

export const Button = (args) => {
  const {
    copy,
    ctaType,
    download,
    href,
    customVideoTitle,
    customVideoDescription,
  } = args?.ButtonCTA ?? {};
  return html`
    <dds-button-group>
      <dds-button-cta
        cta-type="${ifNonNull(ctaType)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        download="${ifNonNull(download)}"
        href="${href}">
        ${copy}
      </dds-button-cta>
      <dds-button-cta
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(download)}"
        href="${href}"
        >${copy}</dds-button-cta
      >
    </dds-button-group>
  `;
};

Button.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      ButtonCTA: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );
        const copy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Copy text', 'Lorem ipsum dolor sit amet');
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable(
                'Custom video description',
                'This is a custom video description'
              )
            : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
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

export const Card = (args) => {
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
  } = args?.CardCTA ?? {};
  return html`
    <dds-card-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      ?no-poster=${noPoster}
      thumbnail="${ifNonNull(thumbnail)}">
      <dds-card-heading>${ctaType !== 'video' ? heading : ''}</dds-card-heading>
      ${ctaType !== 'video' ? copy : ''}
      <dds-card-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        href="${ifNonNull(footerHref)}">
        ${footerCopy || ctaIcons[ctaType]({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-cta>
  `;
};

Card.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: () => {
        const { ctaType } = Text.story.parameters.knobs.TextCTA();
        const noPoster =
          ctaType === CTA_TYPE.VIDEO ? boolean('No Video Poster', false) : null;
        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? null
            : textNullable(
                'Heading (heading):',
                'Explore AI use cases in all industries'
              );
        const thumbnail =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom thumbnail (thumbnail):', '')
            : null;
        return {
          ...Text.story.parameters.knobs.TextCTA(),
          heading,
          thumbnail,
          footerCopy: textNullable('Footer copy text', ''),
          footerHref: textNullable(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          noPoster,
          download:
            ctaType !== CTA_TYPE.DOWNLOAD
              ? undefined
              : textNullable(
                  'Download target (download)',
                  'IBM_Annual_Report_2019.pdf'
                ),
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

export const CardLink = (args) => {
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
  } = args?.CardCTA ?? {};
  return html`
    <dds-card-link-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}">
      <dds-card-link-heading
        >${ctaType !== 'video' ? heading : ''}</dds-card-link-heading
      >
      ${copy ? html` <p>${copy}</p> ` : ``}
      <dds-card-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        href="${ifNonNull(footerHref)}">
        ${footerCopy || ctaIcons[ctaType]({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-link-cta>
  `;
};

CardLink.story = {
  name: 'Card link',
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );
        const copy =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Copy (copy):', '');
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? null
            : textNullable(
                'Heading (heading):',
                'Explore AI use cases in all industries'
              );
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable(
                'Custom video description',
                'This is a custom video description'
              )
            : null;
        return {
          heading,
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          footerCopy: textNullable('Footer copy text', ''),
          footerHref: textNullable(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          footerDownload:
            ctaType !== CTA_TYPE.DOWNLOAD
              ? undefined
              : textNullable(
                  'Download target (download)',
                  'IBM_Annual_Report_2019.pdf'
                ),
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

export const Feature = (args) => {
  const {
    heading,
    ctaType,
    customThumbnail,
    download,
    href,
    customVideoTitle,
    customVideoDescription,
    noPoster,
  } = args?.FeatureCTA ?? {};
  const { download: footerDownload, href: footerHref } =
    args?.FeatureCTAFooter ?? {};
  return html`
    <dds-feature-cta
      cta-type="${ifNonNull(ctaType)}"
      video-name="${ifNonNull(customVideoTitle)}"
      video-description="${ifNonNull(customVideoDescription)}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      ?no-poster=${noPoster}>
      <dds-card-heading>${heading}</dds-card-heading>
      ${ctaType !== CTA_TYPE.VIDEO || customThumbnail
        ? html`
            <dds-image
              slot="image"
              alt="Image alt text"
              default-src="${imgLg1x1}">
            </dds-image>
          `
        : ''}

      <dds-feature-cta-footer
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(footerDownload)}"
        video-name="${ifNonNull(customVideoTitle)}"
        video-description="${ifNonNull(customVideoDescription)}"
        href="${ifNonNull(footerHref)}">
      </dds-feature-cta-footer>
    </dds-feature-cta>
  `;
};

Feature.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      FeatureCTA: () => {
        const ctaType = select('CTA type:', typeOptions, types[CTA_TYPE.LOCAL]);
        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable(
                'Heading',
                'Explore AI uses cases in all industries'
              );
        const download = ![CTA_TYPE.DOWNLOAD, CTA_TYPE.PDF].includes(ctaType)
          ? undefined
          : textNullable(
              'Download target (download)',
              'IBM_Annual_Report_2019.pdf'
            );
        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable(
                'Custom video description',
                'This is a custom video description'
              )
            : null;
        const customThumbnail =
          ctaType === CTA_TYPE.VIDEO ? boolean('Custom image', false) : null;
        const noPoster =
          ctaType === CTA_TYPE.VIDEO ? boolean('No Video Poster', false) : null;
        return {
          heading,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
          thumbnail: null,
          customThumbnail,
          noPoster,
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
          thumbnail: null,
          customThumbnail: false,
          noPoster: false,
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
              <dds-video-cta-container> ${story()} </dds-video-cta-container>
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
