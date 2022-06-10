/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSFeatureCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta';
import DDSFeatureCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/feature-cta-footer';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import readme from './README.stories.react.mdx';
import { hrefsForType, knobNamesForType, footerKnobNamesForType, typeOptions, types } from './ctaTypeConfig';
import { CTA_TYPE } from '../defs';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--001.jpg';

export const Text = ({ parameters }) => {
  const { copy, ctaType, download, href, customVideoTitle, customVideoDescription } = parameters?.props?.TextCTA ?? {};
  return (
    <DDSTextCTA
      cta-type={ctaType || undefined}
      video-name={customVideoTitle || undefined}
      video-description={customVideoDescription || undefined}
      download={download || undefined}
      href={href || undefined}>
      {copy}
    </DDSTextCTA>
  );
};

Text.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      TextCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', typeOptions, types[CTA_TYPE.LOCAL], groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : text('Copy (copy):', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title', groupId) : null;

        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description', groupId) : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};

export const Button = ({ parameters }) => {
  const { copy, ctaType, download, href, customVideoTitle, customVideoDescription } = parameters?.props?.ButtonCTA ?? {};
  return (
    <DDSButtonGroup>
      <DDSButtonCTA
        cta-type={ctaType || undefined}
        video-name={customVideoTitle || undefined}
        video-description={customVideoDescription || undefined}
        download={download || undefined}
        href={href || undefined}>
        {copy}
      </DDSButtonCTA>
      <DDSButtonCTA cta-type={ctaType || undefined} download={download || undefined} href={href || undefined}>
        {copy}
      </DDSButtonCTA>
    </DDSButtonGroup>
  );
};

Button.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      ButtonCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', typeOptions, types[CTA_TYPE.LOCAL], groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : text('Copy (copy):', 'Lorem ipsum dolor sit amet', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title', groupId) : null;

        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description', groupId) : null;

        return {
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
        };
      },
    },
  },
};

export const Card = ({ parameters }) => {
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
  } = parameters?.props?.CardCTA ?? {};
  return (
    <DDSCardCTA
      cta-type={ctaType || undefined}
      video-name={customVideoTitle || undefined}
      video-description={customVideoDescription || undefined}
      download={download || undefined}
      href={href || undefined}
      noPoster={noPoster}
      thumbnail={thumbnail || undefined}>
      <DDSCardHeading> {ctaType !== 'video' ? heading : ''}</DDSCardHeading>
      {ctaType !== 'video' ? copy : ''}
      <DDSCardCTAFooter
        cta-type={ctaType || undefined}
        video-name={customVideoTitle || undefined}
        video-description={customVideoDescription || undefined}
        download={footerDownload || undefined}
        href={footerHref || undefined}></DDSCardCTAFooter>
    </DDSCardCTA>
  );
};

Card.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: ({ groupId }) => {
        const { ctaType } = Text.story.parameters.knobs.TextCTA({ groupId: groupId.replace(/Footer$/, '') });
        const noPoster = ctaType === CTA_TYPE.VIDEO ? boolean('No Video Poster', false, groupId) : null;
        const heading =
          ctaType === CTA_TYPE.VIDEO ? null : text('Heading (heading):', 'Explore AI use cases in all industries', groupId);
        const thumbnail = ctaType === CTA_TYPE.VIDEO ? text('Custom thumbnail (thumbnail):', '', groupId) : null;
        return {
          ...Text.story.parameters.knobs.TextCTA({ groupId }),
          heading,
          thumbnail,
          footerCopy: text('Footer copy text', '', groupId),
          footerHref: text(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
            groupId
          ),
          noPoster,
          download:
            ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId),
        };
      },
    },
  },
};

export const CardLink = ({ parameters }) => {
  const { heading, copy, ctaType, download, footerDownload, href, footerHref, customVideoTitle, customVideoDescription } =
    parameters?.props?.CardCTA ?? {};
  return (
    <DDSCardLinkCTA
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
    </DDSCardLinkCTA>
  );
};

CardLink.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-4 bx--no-gutter',
    knobs: {
      CardCTA: ({ groupId }) => {
        const ctaType = select('CTA type (cta-type)', typeOptions, types[CTA_TYPE.LOCAL], groupId);
        const copy = ctaType === CTA_TYPE.VIDEO ? undefined : text('Copy (copy):', '', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const heading =
          ctaType === CTA_TYPE.VIDEO ? null : text('Heading (heading):', 'Explore AI use cases in all industries', groupId);
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title', groupId) : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description', groupId) : null;
        return {
          heading,
          copy,
          ctaType,
          download,
          customVideoTitle,
          customVideoDescription,
          href: text(knobNamesForType[ctaType ?? CTA_TYPE.REGULAR], hrefsForType[ctaType ?? CTA_TYPE.REGULAR], groupId),
          footerCopy: text('Footer copy text', '', groupId),
          footerHref: text(
            footerKnobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR],
            groupId
          ),
          footerDownload:
            ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId),
        };
      },
    },
  },
};

export const Feature = ({ parameters }) => {
  const { heading, ctaType, download, href, customVideoTitle, customVideoDescription } = parameters?.props?.FeatureCTA ?? {};
  const { download: footerDownload, href: footerHref } = parameters?.props?.FeatureCTAFooter ?? {};
  return (
    <DDSFeatureCTA
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
    </DDSFeatureCTA>
  );
};

Feature.story = {
  parameters: {
    gridContentClasses: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      FeatureCTA: ({ groupId }) => {
        const ctaType = select('CTA type:', typeOptions, types[CTA_TYPE.LOCAL], groupId);
        const heading =
          ctaType === CTA_TYPE.VIDEO ? undefined : text('Heading', 'Explore AI uses cases in all industries', groupId);
        const download =
          ctaType !== CTA_TYPE.DOWNLOAD ? undefined : text('Download target (download)', 'IBM_Annual_Report_2019.pdf', groupId);
        const customVideoTitle = ctaType === CTA_TYPE.VIDEO ? text('Custom video title', 'Custom video title', groupId) : null;
        const customVideoDescription =
          ctaType === CTA_TYPE.VIDEO ? text('Custom video description', 'This is a custom video description', groupId) : null;
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
