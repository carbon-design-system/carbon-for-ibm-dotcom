/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable babel/no-unused-expressions */

import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCTAHead from '@carbon/ibmdotcom-web-components/es/components-react/cta/cta';
import DDSFeatureCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta-footer';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import readme from './README.stories.react.mdx';
import { hrefsForType, knobNamesForType, footerKnobNamesForType, typeOptions, types } from './ctaTypeConfig';
import { CTA_TYPE } from '../defs';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';

let duration;

export const Text = args => {
  const { copy, ctaType, download, href, customVideoTitle, customVideoDescription } = args?.TextCTA ?? {};

  const childCta = document.querySelector('dds-cta')?.shadowRoot!.children[0];
  childCta?.setAttribute('href', href);

  if (ctaType === 'video' && childCta) {
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

  return (
    <DDSCTAHead
      cta-style="text"
      cta-type={ctaType || undefined}
      video-name={customVideoTitle || undefined}
      video-description={customVideoDescription || undefined}
      download={download || undefined}
      href={href || undefined}>
      {copy || customVideoTitle}
    </DDSCTAHead>
  );
};

Text.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      TextCTA: () => {
        const ctaType = select('CTA type (cta-type)', typeOptions, types[CTA_TYPE.LOCAL]);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : text('Copy (copy):', 'Lorem ipsum dolor sit amet');
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf');
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title') : null;

        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description') : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR]),
        };
      },
    },
  },
};

export const Button = args => {
  const { copy, ctaType, download, href, customVideoTitle, customVideoDescription } = args?.ButtonCTA ?? {};

  const childCta = document.querySelector('dds-cta')?.shadowRoot!.children[0];
  childCta?.setAttribute('href', href);

  if (ctaType === 'video' && childCta) {
    duration ? null : (duration = childCta.textContent!.match(/\((.*)\)/)?.pop());
    childCta && duration
      ? (childCta.textContent = `${customVideoTitle} (${duration})`)
      : ((childCta as HTMLElement).innerText = customVideoTitle);
  }

  return (
    <DDSButtonGroup>
      <DDSCTAHead
        cta-style="button"
        cta-type={ctaType || undefined}
        video-name={customVideoTitle || undefined}
        video-description={customVideoDescription || undefined}
        download={download || undefined}
        href={href || undefined}>
        {copy}
      </DDSCTAHead>
      <DDSCTAHead cta-style="button" cta-type={ctaType || undefined} download={download || undefined} href={href || undefined}>
        {copy}
      </DDSCTAHead>
    </DDSButtonGroup>
  );
};

Button.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      ButtonCTA: () => {
        const ctaType = select('CTA type (cta-type)', typeOptions, types[CTA_TYPE.LOCAL]);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : text('Copy (copy):', 'Lorem ipsum dolor sit amet');
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf');
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title') : null;

        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description') : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR]),
        };
      },
    },
  },
};

export const Card = args => {
  const {
    heading,
    copy,
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

  const childCta = document.querySelector('dds-cta')?.shadowRoot!.children[0];
  childCta?.setAttribute('href', href);

  if (ctaType === 'video') {
    const headingComponent =
      childCta?.shadowRoot?.querySelector('dds-card-heading') || childCta?.querySelector('dds-card-heading');
    headingComponent && !duration ? (duration = headingComponent?.textContent!.match(/\((.*)\)/)?.pop()) : null;

    if (headingComponent?.textContent) {
      duration
        ? (headingComponent!.textContent = `${customVideoTitle} (${duration})`)
        : (headingComponent!.textContent = customVideoTitle);
    }
    childCta && noPoster ? childCta?.setAttribute('no-poster', '') : childCta?.removeAttribute('no-poster');
  }

  return (
    <DDSCTAHead
      cta-style="card"
      cta-type={ctaType || undefined}
      video-name={customVideoTitle || undefined}
      video-description={customVideoDescription || undefined}
      download={download || undefined}
      href={href || undefined}
      noPoster={noPoster}
      thumbnail={thumbnail || undefined}>
      <DDSCardHeading>{heading || customVideoTitle}</DDSCardHeading>
      {ctaType !== 'video' ? copy : ''}
      <DDSCardCTAFooter
        cta-type={ctaType || undefined}
        video-name={customVideoTitle || undefined}
        video-description={customVideoDescription || undefined}
        download={footerDownload || undefined}
        href={footerHref || undefined}></DDSCardCTAFooter>
    </DDSCTAHead>
  );
};

Card.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: () => {
        const { ctaType } = Text.story.parameters.knobs.TextCTA();
        const noPoster = ctaType === CTA_TYPE.VIDEO ? boolean('No Video Poster', false) : null;
        const heading = ctaType === CTA_TYPE.VIDEO ? null : text('Heading (heading):', 'Explore AI use cases in all industries');
        const thumbnail = ctaType === CTA_TYPE.VIDEO ? text('Custom thumbnail (thumbnail):', '') : null;
        return {
          ...Text.story.parameters.knobs.TextCTA(),
          heading,
          thumbnail,
          footerCopy: text('Footer copy text', ''),
          footerHref: text(footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR]),
          noPoster,
          download: ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf'),
        };
      },
    },
  },
};

export const CardLink = args => {
  const { heading, copy, ctaType, download, footerDownload, href, footerHref, customVideoTitle, customVideoDescription } =
    args?.CardCTA ?? {};

  const childCta = document.querySelector('dds-cta')?.shadowRoot!.children[0];
  childCta?.setAttribute('href', href);

  if (ctaType === 'video') {
    const headingComponent =
      childCta?.shadowRoot?.querySelector('dds-card-link-heading') || childCta?.querySelector('dds-card-link-heading');
    headingComponent && !duration ? (duration = headingComponent?.textContent!.match(/\((.*)\)/)?.pop()) : null;

    if (headingComponent?.textContent) {
      duration
        ? (headingComponent!.textContent = `${customVideoTitle} (${duration})`)
        : (headingComponent!.textContent = customVideoTitle);
    }
  }

  return (
    <DDSCTAHead
      cta-style="card-link"
      cta-type={ctaType || undefined}
      video-name={customVideoTitle || undefined}
      video-description={customVideoDescription || undefined}
      download={download || undefined}
      href={href || undefined}>
      <DDSCardLinkHeading> {ctaType !== 'video' ? heading : ''}</DDSCardLinkHeading>
      {copy ? <p>{copy}</p> : ''}
      <DDSCardCTAFooter
        cta-type={ctaType || undefined}
        video-name={customVideoTitle || undefined}
        video-description={customVideoDescription || undefined}
        download={footerDownload || undefined}
        href={footerHref || undefined}></DDSCardCTAFooter>
    </DDSCTAHead>
  );
};

CardLink.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: () => {
        const ctaType = select('CTA type (cta-type)', typeOptions, types[CTA_TYPE.LOCAL]);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : text('Copy (copy):', '');
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf');
        const heading = ctaType === CTA_TYPE.VIDEO ? null : text('Heading (heading):', 'Explore AI use cases in all industries');
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title') : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description') : null;
        return {
          heading,
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR]),
          footerCopy: text('Footer copy text', ''),
          footerHref: text(footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR]),
          footerDownload:
            ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf'),
        };
      },
    },
  },
};

export const Feature = args => {
  const { heading, ctaType, download, href, customVideoTitle, customVideoDescription } = args?.FeatureCTA ?? {};
  const { download: footerDownload, href: footerHref } = args?.FeatureCTAFooter ?? {};

  const childCta = document.querySelector('dds-cta')?.shadowRoot!.children[0];
  childCta?.setAttribute('href', href);

  if (ctaType === 'video') {
    const headingComponent =
      childCta?.shadowRoot?.querySelector('dds-card-heading') || childCta?.querySelector('dds-card-heading');
    headingComponent && !duration ? (duration = headingComponent?.textContent!.match(/\((.*)\)/)?.pop()) : null;

    if (headingComponent?.textContent) {
      duration
        ? (headingComponent!.textContent = `${customVideoTitle} (${duration})`)
        : (headingComponent!.textContent = customVideoTitle);
    }
  }

  return (
    <DDSCTAHead
      cta-style="feature"
      cta-type={ctaType || undefined}
      video-name={customVideoTitle || undefined}
      video-description={customVideoDescription || undefined}
      download={download || undefined}
      href={href || undefined}>
      <DDSCardHeading>{heading}</DDSCardHeading>
      <DDSImage slot="image" alt="Image alt text" default-src={imgLg1x1} />
      <DDSFeatureCTAFooter
        cta-type={ctaType || undefined}
        video-name={customVideoTitle || undefined}
        video-description={customVideoDescription || undefined}
        download={footerDownload || undefined}
        href={footerHref || undefined}
      />
    </DDSCTAHead>
  );
};

Feature.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      FeatureCTA: () => {
        const ctaType = select('CTA type:', typeOptions, types[CTA_TYPE.LOCAL]);
        const heading = ctaType === CTA_TYPE.VIDEO ? undefined : text('Heading', 'Explore AI uses cases in all industries');
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf');
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title') : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description') : null;
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
  },
};

export default {
  title: 'Components/CTA',
  decorators: [
    (story, { parameters }) => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className={parameters.gridContentClasses}>
              <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
