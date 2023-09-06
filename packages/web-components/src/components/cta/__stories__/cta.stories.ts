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
import '../cta';
import '../../button-group/index';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select, boolean } from '@storybook/addon-knobs';
import { icons as ctaIcons } from '../../../component-mixins/cta/cta';
// eslint-disable-next-line sort-imports
import { CTA_TYPE, CTA_STYLE } from '../defs';
import {
  hrefsForType,
  knobNamesForType,
  footerKnobNamesForType,
  styleOptions,
  typeOptions,
  types,
} from './ctaTypeConfig';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

let duration;

export const Default = (args) => {
  const {
    copy,
    heading,
    customThumbnail,
    footerDownload,
    footerHref,
    footerCopy,
    ctaStyle,
    ctaType,
    download,
    href,
    noPoster,
    thumbnail,
    customVideoTitle,
    customVideoDescription,
  } = args?.DefaultCTA ?? {};

  // due to the shadow DOM nesting, modifying storybook knobs won't retrigger some DOM updates
  // these are for demo purposes only
  if (ctaType === 'video') {
    const childCta = document.querySelector('c4d-cta')?.shadowRoot!.children[0];

    if (ctaStyle === 'card' || ctaStyle === 'feature') {
      const headingComponent =
        childCta?.shadowRoot?.querySelector('c4d-card-heading') ||
        childCta?.querySelector('c4d-card-heading');
      headingComponent && !duration
        ? (duration = headingComponent!.textContent!.match(/\((.*)\)/)?.pop())
        : null;
      if (headingComponent?.textContent) {
        duration
          ? (headingComponent!.textContent = `${customVideoTitle} (${duration})`)
          : (headingComponent!.textContent = customVideoTitle);
      }
      childCta && noPoster
        ? childCta?.setAttribute('no-poster', '')
        : childCta?.removeAttribute('no-poster');
    }

    if (ctaStyle === 'text' && childCta) {
      duration
        ? null
        : (duration = childCta!
            .shadowRoot!.querySelector('span')!
            .textContent!.match(/\((.*)\)/)
            ?.pop());
      const spanComponent = childCta!.shadowRoot!.querySelector('span');
      spanComponent && duration
        ? (spanComponent.textContent = `${customVideoTitle} (${duration})`)
        : (spanComponent!.textContent = customVideoTitle);
    }

    if (ctaStyle === 'button' && childCta) {
      duration
        ? null
        : (duration = childCta.textContent!.match(/\((.*)\)/)?.pop());
      childCta && duration
        ? (childCta.textContent = `${customVideoTitle} (${duration})`)
        : ((childCta as HTMLElement).innerText = customVideoTitle);
    }
  }

  const childCta = document.querySelector('c4d-cta')?.shadowRoot!.children[0];
  childCta?.setAttribute('href', href);

  return html`
    ${ctaStyle === 'button'
      ? html`
          <c4d-button-group>
            <c4d-cta
              cta-style="button"
              cta-type="${ifDefined(ctaType)}"
              video-name="${ifDefined(customVideoTitle)}"
              video-description="${ifDefined(customVideoDescription)}"
              download="${ifDefined(download)}"
              href="${ifDefined(href)}">
              ${copy}
            </c4d-cta>
            <c4d-cta
              cta-style="button"
              cta-type="${ifDefined(ctaType)}"
              href="${ifDefined(href)}"
              >${copy}</c4d-cta
            >
          </c4d-button-group>
        `
      : html`
          <c4d-cta
            cta-style="${ifDefined(ctaStyle)}"
            cta-type="${ifDefined(ctaType)}"
            video-name="${ifDefined(customVideoTitle)}"
            video-description="${ifDefined(customVideoDescription)}"
            download="${ifDefined(download)}"
            ?no-poster=${noPoster}
            thumbnail="${ifDefined(thumbnail)}"
            href="${ifDefined(href)}">
            ${ctaStyle !== 'card' ? copy : ''}
            ${ctaStyle === 'card'
              ? html`
                  ${ctaType !== 'video'
                    ? html` <c4d-card-heading>${heading}</c4d-card-heading> `
                    : ''}
                  ${ctaType !== 'video' ? copy : ''}
                  <c4d-card-cta-footer
                    cta-type="${ifDefined(ctaType)}"
                    download="${ifDefined(footerDownload)}"
                    video-name="${ifDefined(customVideoTitle)}"
                    video-description="${ifDefined(customVideoDescription)}"
                    href="${ifDefined(footerHref)}">
                    ${footerCopy || ctaIcons[ctaType]({ slot: 'icon' })}
                  </c4d-card-cta-footer>
                `
              : ''}
            ${ctaStyle === 'feature'
              ? html`
                  ${ctaType !== 'video'
                    ? html` <c4d-card-heading>${heading}</c4d-card-heading> `
                    : ''}
                  ${ctaType !== CTA_TYPE.VIDEO || customThumbnail
                    ? html`
                        <c4d-image
                          slot="image"
                          alt="Image alt text"
                          default-src="${imgLg1x1}">
                        </c4d-image>
                      `
                    : ''}
                  <c4d-feature-cta-footer
                    cta-type="${ifDefined(ctaType)}"
                    download="${ifDefined(footerDownload)}"
                    video-name="${ifDefined(customVideoTitle)}"
                    video-description="${ifDefined(customVideoDescription)}"
                    href="${ifDefined(footerHref)}">
                    ${footerCopy || ctaIcons[ctaType]({ slot: 'icon' })}
                  </c4d-feature-cta-footer>
                `
              : ''}
            ${ctaStyle === 'card-link'
              ? html`
                  <c4d-card-link-heading>${heading}</c4d-card-link-heading>
                  ${copy}
                  <c4d-card-cta-footer
                    cta-type="${ifDefined(ctaType)}"
                    download="${ifDefined(footerDownload)}"
                    video-name="${ifDefined(customVideoTitle)}"
                    video-description="${ifDefined(customVideoDescription)}"
                    href="${ifDefined(footerHref)}">
                    ${footerCopy || ctaIcons[ctaType]({ slot: 'icon' })}
                  </c4d-card-cta-footer>
                `
              : ''}
          </c4d-cta>
        `}
  `;
};

Default.story = {
  parameters: {
    gridContentClasses: 'cds--col-sm-4 cds--col-lg-8',
    knobs: {
      DefaultCTA: () => {
        const ctaStyle = select(
          'CTA style (cta-style)',
          styleOptions,
          styleOptions[CTA_STYLE.TEXT] || 'text'
        );
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );

        const noPoster =
          (ctaStyle === CTA_STYLE.CARD || ctaStyle === CTA_STYLE.FEATURE) &&
          ctaType === CTA_TYPE.VIDEO
            ? boolean('No Video Poster ', false)
            : null;
        const heading =
          ctaStyle === CTA_STYLE.TEXT ||
          ctaStyle === CTA_STYLE.BUTTON ||
          ctaType === CTA_TYPE.VIDEO
            ? null
            : textNullable(
                'Heading (heading):',
                'Explore AI use cases in all industries'
              );

        const thumbnail =
          ctaStyle === CTA_STYLE.CARD && ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom thumbnail (thumbnail):', '')
            : null;

        const customThumbnail =
          ctaStyle === CTA_STYLE.FEATURE && ctaType === CTA_TYPE.VIDEO
            ? boolean('Custom image ', false)
            : null;

        const copy =
          ctaStyle === CTA_STYLE.FEATURE || ctaType === CTA_TYPE.VIDEO
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

        const footerCopy =
          ctaStyle ===
          (CTA_STYLE.CARD || CTA_STYLE.FEATURE || CTA_STYLE.CARDLINK)
            ? textNullable('Footer copy text', '')
            : null;
        const footerHref =
          ctaStyle === (CTA_STYLE.CARD || CTA_STYLE.FEATURE)
            ? textNullable(
                footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
                hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
              )
            : null;
        return {
          heading,
          noPoster,
          thumbnail,
          copy,
          ctaStyle,
          ctaType,
          download,
          customVideoTitle,
          customThumbnail,
          customVideoDescription,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          footerCopy,
          footerHref,
        };
      },
    },
    propsSet: {
      default: {
        DefaultCTA: {
          copy: 'Lorem ipsum dolor sit amet',
          ctaStyle: 'text',
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
        <div class="cds--grid">
          <div class="cds--row">
            <div class="${parameters.gridContentClasses}">
              <c4d-video-cta-container> ${story()} </c4d-video-cta-container>
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
