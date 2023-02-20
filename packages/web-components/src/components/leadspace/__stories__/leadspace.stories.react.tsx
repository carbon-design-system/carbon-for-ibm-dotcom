/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { text, select, number } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20.js';
import Pdf20 from '@carbon/icons-react/es/PDF/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
// @ts-ignore
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
// @ts-ignore
import DDSBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
// @ts-ignore
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
// @ts-ignore
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
// @ts-ignore
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
// @ts-ignore
import DDSTagLink from '@carbon/ibmdotcom-web-components/es/components-react/tag-link/tag-link';
// @ts-ignore
import DDSTagGroup from '@carbon/ibmdotcom-web-components/es/components-react/tag-group/tag-group';
// @ts-ignore
import DDSBreadcrumbLink from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb-link';
// @ts-ignore
import DDSBreadcrumbItem from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb-item';
// @ts-ignore
import DDSBreadcrumb from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb';
// @ts-ignore
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';

import leadspaceImg from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import readme from './README.stories.react.mdx';
import { LEADSPACE_SIZE } from '../defs';

const navigationOptions = ['with Tag group (using Tag link)', 'with Breadcrumbs', 'none'];

const navigationWithTagGroup = (
  <DDSTagGroup slot="navigation">
    <DDSTagLink href={'https://example.com'}>Marketing Analytics</DDSTagLink>
    <DDSTagLink href={'https://example.com'}>Cloud</DDSTagLink>
  </DDSTagGroup>
);

const navigationWithBreadcrumbs = (
  <DDSBreadcrumb slot="navigation">
    <DDSBreadcrumbItem>
      <DDSBreadcrumbLink href="/#">Breadcrumb 1</DDSBreadcrumbLink>
    </DDSBreadcrumbItem>
    <DDSBreadcrumbItem>
      <DDSBreadcrumbLink href="/#">Breadcrumb 2</DDSBreadcrumbLink>
    </DDSBreadcrumbItem>
    <DDSBreadcrumbItem>
      <DDSBreadcrumbLink href="/#" aria-current="page">
        Breadcrumb 3
      </DDSBreadcrumbLink>
    </DDSBreadcrumbItem>
  </DDSBreadcrumb>
);

const getAriaLabel = type => {
  switch (type) {
    case 'ArrowDown20':
      return 'anchor link';
    case 'Pdf20':
      return 'pdf link';
    default:
      return '';
  }
};

const iconMap = {
  ArrowRight20: <ArrowRight20 slot="icon" />,
  ArrowDown20: <ArrowDown20 slot="icon" />,
  Pdf20: <Pdf20 slot="icon" />,
};

const iconOptions = {
  None: null,
  'Arrow Right': 'ArrowRight20',
  'Arrow Down': 'ArrowDown20',
  PDF: 'Pdf20',
};

const Default = ({ parameters }) => {
  const { alt, buttons, copy, defaultSrc, hasImage, hasVideo, navElements, size, title, type } =
    parameters?.props?.Leadspace ?? {};
  return (
    <DDSLeadspace size={size} type={type} {...(hasImage ? { alt } : {})}>
      {navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      {navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <DDSLeadspaceHeading>{title}</DDSLeadspaceHeading>
      {copy}
      <DDSButtonGroup slot="action">
        {buttons.map(elem => {
          return (
            <DDSButtonGroupItem aria-label={elem.label} href={elem.href}>
              {elem.copy}
              {elem.renderIcon}
            </DDSButtonGroupItem>
          );
        })}
      </DDSButtonGroup>
      {hasImage && (
        <DDSBackgroundMedia default-src={defaultSrc} alt={alt} opacity="100">
          <DDSImageItem media="(min-width: 672px)" srcset={leadspaceImg}></DDSImageItem>
          <DDSImageItem media="(min-width: 0)" srcset={leadspaceImg}></DDSImageItem>
        </DDSBackgroundMedia>
      )}
      {hasVideo && (
        <DDSBackgroundMedia mobilePosition="bottom" opacity="100">
          <DDSVideoPlayerContainer video-id="1_9h94wo6b" background-mode="true"></DDSVideoPlayerContainer>
        </DDSBackgroundMedia>
      )}
    </DDSLeadspace>
  );
};

export const Tall = context => Default(context);
Tall.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasImage: false,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
      }),
    },
  },
};

export const TallWithImage = context => Default(context);
TallWithImage.story = {
  name: 'Tall with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const TallWithVideo = context => Default(context);
TallWithVideo.story = {
  name: 'Tall with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasVideo: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const Medium = context => Default(context);

Medium.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
      }),
    },
  },
};

export const MediumWithImage = context => Default(context);

MediumWithImage.story = {
  name: 'Medium with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const MediumWithVideo = context => Default(context);

MediumWithVideo.story = {
  name: 'Medium with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        hasVideo: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const Short = ({ parameters }) => {
  const { alt, defaultSrc, hasImage, hasVideo, navElements, size, title, type } = parameters?.props?.Leadspace ?? {};
  return (
    <DDSLeadspace size={size} type={type} {...(hasImage ? { alt } : {})}>
      {navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      {navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <DDSLeadspaceHeading>{title}</DDSLeadspaceHeading>
      {hasImage && (
        <DDSBackgroundMedia default-src={defaultSrc} alt={alt} opacity="100">
          <DDSImageItem media="(min-width: 672px)" srcset={leadspaceImg}></DDSImageItem>
          <DDSImageItem media="(min-width: 0)" srcset={leadspaceImg}></DDSImageItem>
        </DDSBackgroundMedia>
      )}
      {hasVideo && (
        <DDSBackgroundMedia mobilePosition="bottom" opacity="100">
          <DDSVideoPlayerContainer video-id="1_9h94wo6b" background-mode="true"></DDSVideoPlayerContainer>
        </DDSBackgroundMedia>
      )}
    </DDSLeadspace>
  );
};

Short.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SHORT,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'A short headline can go on multiple lines in this leadspace'),
      }),
    },
  },
};

export const ShortWithImage = context => Short(context);

ShortWithImage.story = {
  name: 'Short with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SHORT,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'A short headline can go on multiple lines in this leadspace'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const ShortWithVideo = context => Short(context);

ShortWithVideo.story = {
  name: 'Short with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SHORT,
        hasVideo: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'A short headline can go on multiple lines in this leadspace'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const Centered = context => Default(context);

Centered.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        type: 'centered',
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
      }),
    },
  },
};

export const CenteredWithImage = context => Default(context);

CenteredWithImage.story = {
  name: 'Centered with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        hasImage: true,
        type: 'centered',
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const CenteredWithVideo = context => Default(context);

CenteredWithVideo.story = {
  name: 'Centered with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        hasVideo: true,
        type: 'centered',
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const Super = context => Tall(context);

Super.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
      }),
    },
  },
};

export const SuperWithImage = context => Tall(context);

SuperWithImage.story = {
  name: 'Super with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const SuperWithVideo = context => Tall(context);

SuperWithVideo.story = {
  name: 'Super with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        hasVideo: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ?? 0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export default {
  title: 'Components/Leadspace',
  decorators: [
    story => {
      return <div className="bx--grid bx--no-gutter">{story()}</div>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
