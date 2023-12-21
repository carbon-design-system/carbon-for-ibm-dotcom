/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Desktop from '@carbon/pictograms-react/lib/desktop/index.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import C4DCard from '@carbon/ibmdotcom-web-components/es/components-react/card/card';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageLogo from '@carbon/ibmdotcom-web-components/es/components-react/card/image-logo';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import Tag from '@carbon/web-components/es/components-react/tag/tag.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.react.mdx';
import imgXlg4x3 from '../../../../.storybook/storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import logoMicrosoft2x1 from '../../../../.storybook/storybook-images/assets/logos/logo-microsoft--2x1.png';
import { PICTOGRAM_PLACEMENT } from '../defs';

import { CTA_TYPE } from '../../cta/defs';
import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Default = (args) => {
  const {
    aspectRatio,
    ctaType,
    disabled,
    noPoster,
    image,
    href,
    alt,
    defaultSrc,
    heading,
    eyebrow,
    tagGroup,
    copy,
    cardStyles,
    customVideoTitle,
  } = args?.Card ?? {};
  /* eslint-disable no-nested-ternary */

  let videoCopy;
  let videoFooterCopy;

  if (ctaType === CTA_TYPE.VIDEO) {
    const card = document.querySelector('c4d-card') as any;
    const duration = card?.videoTitle?.match(/\((.*)\)/)?.pop();

    if (!customVideoTitle) {
      videoCopy = card?.videoTitle;
    } else {
      videoCopy = customVideoTitle;
    }

    videoFooterCopy = duration;
  }

  const copyComponent = document.querySelector('c4d-card')?.querySelector('p');
  if (copyComponent) {
    copyComponent!.innerHTML = copy;
  }

  return (
    <C4DVideoCTAContainer>
      <C4DCard
        disabled={disabled || undefined}
        aspect-ratio={aspectRatio}
        no-poster={noPoster || undefined}
        cta-type={ctaType}
        color-scheme={cardStyles === 'Inverse card' ? 'inverse' : ''}
        href={href || undefined}>
        {image ? (
          <C4DImage
            slot="image"
            alt={alt || undefined}
            default-src={defaultSrc || undefined}></C4DImage>
        ) : (
          ``
        )}
        <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
        <C4DCardHeading>{videoCopy ?? heading}</C4DCardHeading>
        {copy ? <p></p> : ``}
        {tagGroup ? (
          <div>
            <Tag type="green">Most popular</Tag>
            <Tag type="purple">Enterprise</Tag>
          </div>
        ) : (
          ''
        )}
        {ctaType === CTA_TYPE.VIDEO ? (
          <C4DCardFooter> {videoFooterCopy} </C4DCardFooter>
        ) : (
          <C4DCardFooter></C4DCardFooter>
        )}
      </C4DCard>
    </C4DVideoCTAContainer>
  );
};

Default.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: () => {
        const aspectRatio = select(
          'Aspect ratio (aspect-ratio)',
          ['1:1', '2:1', '3:2', '4:3', '16:9', '1:1'],
          '2:1'
        );
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );

        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Heading:', 'Aerospace and defence');

        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;

        const image =
          ctaType === CTA_TYPE.VIDEO ? null : boolean('Add image:', false);
        const noPoster =
          ctaType === CTA_TYPE.VIDEO ? boolean('No poster:', false) : null;

        return {
          disabled: boolean('Disabled:', false),
          aspectRatio,
          customVideoTitle,
          ctaType,
          image,
          noPoster,
          eyebrow: textNullable('Eyebrow:', 'Industry'),
          heading,
          copy: textNullable('Body copy:', ''),
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          tagGroup: boolean('Add tags:', false),
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
          cardStyles: select('Card style:', ['Inverse card', 'none'], 'none'),
        };
      },
    },
  },
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = (args) => {
  const { href, heading, copy, tagGroup, pictogramPlacement, cardStyles } =
    args?.PictogramCard ?? {};
  return (
    <C4DCard
      pictogramPlacement={pictogramPlacement}
      href={href || undefined}
      colorScheme={cardStyles === 'Inverse card' ? 'inverse' : ''}>
      <C4DCardHeading>{heading}</C4DCardHeading>
      {copy ? <p>{copy}</p> : ''}
      {tagGroup ? (
        <div>
          <Tag>Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </div>
      ) : (
        ''
      )}
      <Desktop slot="pictogram" width="48" height="48" />
    </C4DCard>
  );
};

Pictogram.story = {
  parameters: {
    knobs: {
      PictogramCard: () => {
        const pictogramPlacement = select(
          'Pictogram position:',
          pictogramPlacements,
          pictogramPlacements.bottom
        );
        const copy = textNullable(
          'Body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        );
        return {
          pictogramPlacement,
          heading: textNullable('Heading:', 'Aerospace and defence'),
          copy,
          href: 'https://example.com',
          cardStyles: select('Card style:', ['Inverse card', 'none'], 'none'),
        };
      },
    },
  },
};

export const Static = (args) => {
  const { image, alt, defaultSrc, eyebrow, heading, copy, tagGroup, cta } =
    args?.StaticCard ?? {};
  return (
    <C4DCard>
      {image ? (
        <C4DImage
          slot="image"
          alt={alt || undefined}
          default-src={defaultSrc || undefined}></C4DImage>
      ) : (
        ``
      )}
      <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
      <C4DCardHeading>{heading}</C4DCardHeading>
      {copy ? <p>{copy}</p> : ''}
      {tagGroup ? (
        <div>
          <Tag type="green">Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </div>
      ) : (
        ''
      )}
      {cta ? (
        <C4DCardFooter href="https://www.example.com">
          Sign up for the trial
          <ArrowRight20 slot="icon" />
        </C4DCardFooter>
      ) : (
        ''
      )}
    </C4DCard>
  );
};

Static.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      StaticCard: () => {
        const image = boolean('Add image:', false);
        const eyebrow = textNullable('Eyebrow:', 'SPSS Statistics');
        const heading = textNullable('Heading:', 'Free trial');
        const copy = textNullable(
          'Body copy:',
          'Enjoy full SPSS Statistics capabilities including all add-ons. ' +
            'All trial registrants are restricted to one free trial per computer per user.'
        );
        const tagGroup = boolean('Add tags:', false);
        const cta = boolean('Add CTA:', false);
        const ctaCopy = cta
          ? textNullable('CTA copy:', 'Sign up for the trial')
          : '';
        return {
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          image,
          eyebrow,
          heading,
          copy,
          tagGroup,
          cta,
          ctaCopy,
        };
      },
    },
  },
};

export const Logo = (args) => {
  const { alt, defaultSrc, eyebrow, heading, href, copy, tagGroup } =
    args?.Card ?? {};
  return (
    <C4DCard logo href={href || undefined}>
      <C4DImageLogo
        slot="image"
        alt={alt}
        default-src={defaultSrc}></C4DImageLogo>
      {eyebrow ? <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow> : ''}
      {heading ? <C4DCardHeading>{heading}</C4DCardHeading> : ''}
      {copy ? <p>{copy}</p> : ``}
      {tagGroup ? (
        <div>
          <Tag type="green">Most popular</Tag>
          <Tag type="purple">Enterprise</Tag>
        </div>
      ) : (
        ''
      )}
      <C4DCardFooter></C4DCardFooter>
    </C4DCard>
  );
};

export const Link = (args) => {
  const { disabled, ctaType, href, heading, copy, customVideoTitle } =
    args?.Card ?? {};

  let videoCopy;

  if (ctaType === CTA_TYPE.VIDEO) {
    const card = document.querySelector('c4d-card') as any;
    const duration = card?.videoTitle?.match(/\((.*)\)/)?.pop();

    if (!customVideoTitle) {
      videoCopy = card?.videoTitle;
    } else {
      videoCopy = customVideoTitle;
    }

    card.querySelector('c4d-card-footer')!.innerHTML = duration ?? '';
  }

  const copyComponent = document.querySelector('c4d-card')?.querySelector('p');
  if (copyComponent) {
    copyComponent!.innerHTML = copy;
  }

  return (
    <C4DVideoCTAContainer>
      <C4DCard
        disabled={disabled || undefined}
        link
        no-poster={ctaType === CTA_TYPE.VIDEO}
        cta-type={ctaType}
        href={href || undefined}>
        <C4DCardHeading>{videoCopy ?? heading}</C4DCardHeading>
        {copy ? <p></p> : ``}
        <C4DCardFooter></C4DCardFooter>
      </C4DCard>
    </C4DVideoCTAContainer>
  );
};

Link.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );

        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Heading:', 'Aerospace and defence');

        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;

        return {
          disabled: boolean('Disabled: ', false),
          customVideoTitle,
          ctaType,
          heading,
          copy: textNullable('Body copy:', ''),
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
  },
};

Logo.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: () => ({
        alt: 'Image alt text',
        defaultSrc: logoMicrosoft2x1,
        tagGroup: boolean('Add tags', true),
        eyebrow: textNullable('Card Eyebrow:', 'Microsoft'),
        heading: textNullable('Card Heading (optional):', ''),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        ),
        href: 'https://example.com',
      }),
    },
  },
};

export default {
  title: 'Components/Card',
  decorators: [
    (story) => (
      <div className="cds--grid">
        <div className="cds--row">
          <div className="cds--col-sm-4 cds--col-md-3 cds--col-lg-6 cds--col-xlg-4 cds--no-gutter">
            {story()}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
