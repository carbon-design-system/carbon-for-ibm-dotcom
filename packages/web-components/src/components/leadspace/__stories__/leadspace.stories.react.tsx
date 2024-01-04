/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { text, select, number } from '@storybook/addon-knobs';
import { ArrowDown, ArrowRight, Pdf } from '@carbon/icons-react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
// @ts-ignore
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
// @ts-ignore
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
// @ts-ignore
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
// @ts-ignore
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
// @ts-ignore
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
// @ts-ignore
import C4DBreadcrumbLink from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb-link';
// @ts-ignore
import C4DBreadcrumbItem from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb-item';
// @ts-ignore
import C4DBreadcrumb from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb';
// @ts-ignore
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import CDSTag from '@carbon/web-components/es/components-react/tag/tag';

import leadspaceImg from '../../../../.storybook/storybook-images/assets/leadspace/leadspaceMax.jpg';
import readme from './README.stories.react.mdx';
import { LEADSPACE_SIZE } from '../defs';

const navigationOptions = ['with a group of Tags', 'with Breadcrumbs', 'none'];

const typeStyleOptions = {
  'Display 01': 'display-01',
  'Fluid heading 05': 'fluid-heading-05',
};

const navigationWithTagGroup = (
  <div slot="navigation">
    <CDSTag href={'https://example.com'}>Marketing Analytics</CDSTag>
    <CDSTag href={'https://example.com'}>Cloud</CDSTag>
  </div>
);

const navigationWithBreadcrumbs = (
  <C4DBreadcrumb slot="navigation">
    <C4DBreadcrumbItem>
      <C4DBreadcrumbLink href="/#">Breadcrumb 1</C4DBreadcrumbLink>
    </C4DBreadcrumbItem>
    <C4DBreadcrumbItem>
      <C4DBreadcrumbLink href="/#">Breadcrumb 2</C4DBreadcrumbLink>
    </C4DBreadcrumbItem>
    <C4DBreadcrumbItem>
      <C4DBreadcrumbLink href="/#" aria-current="page">
        Breadcrumb 3
      </C4DBreadcrumbLink>
    </C4DBreadcrumbItem>
  </C4DBreadcrumb>
);

const getAriaLabel = (type) => {
  switch (type) {
    case 'ArrowDown':
      return 'anchor link';
    case 'Pdf':
      return 'pdf link';
    default:
      return '';
  }
};

const iconMap = {
  ArrowRight: <ArrowRight size="20" slot="icon" />,
  ArrowDown: <ArrowDown size="20" slot="icon" />,
  Pdf: <Pdf size="20" slot="icon" />,
};

const iconOptions = {
  None: null,
  'Arrow Right': 'ArrowRight',
  'Arrow Down': 'ArrowDown',
  PDF: 'Pdf',
};

const Default = (args) => {
  const {
    alt,
    buttons,
    copy,
    defaultSrc,
    hasImage,
    hasVideo,
    navElements,
    size,
    title,
    type,
    highlight,
    typeStyle,
  } = args?.Leadspace ?? {};
  return (
    <C4DLeadspace size={size} type={type} {...(hasImage ? { alt } : {})}>
      {navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      {navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <C4DLeadspaceHeading highlight={highlight} type-style={typeStyle}>
        {title}
      </C4DLeadspaceHeading>
      {copy}
      <C4DButtonGroup slot="action">
        {buttons.map((elem) => {
          return (
            <C4DButtonGroupItem aria-label={elem.label} href={elem.href}>
              {elem.copy}
              {elem.renderIcon}
            </C4DButtonGroupItem>
          );
        })}
      </C4DButtonGroup>
      {hasImage && (
        <C4DBackgroundMedia default-src={defaultSrc} alt={alt} opacity="100">
          <C4DImageItem
            media="(min-width: 672px)"
            srcset={leadspaceImg}></C4DImageItem>
          <C4DImageItem
            media="(min-width: 0)"
            srcset={leadspaceImg}></C4DImageItem>
        </C4DBackgroundMedia>
      )}
      {hasVideo && (
        <C4DBackgroundMedia mobilePosition="bottom" opacity="100">
          <C4DVideoPlayerContainer
            video-id="0_ibuqxqbe"
            background-mode="true"></C4DVideoPlayerContainer>
        </C4DBackgroundMedia>
      )}
    </C4DLeadspace>
  );
};

export const Tall = (context) => Default(context);
Tall.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasImage: false,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
            typeStyle: select('Type style', typeStyleOptions, 'display-01'),
          };
        }),
      }),
    },
  },
};

export const TallWithImage = (context) => Default(context);
TallWithImage.story = {
  name: 'Tall with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasImage: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
            typeStyle: select('Type style', typeStyleOptions, 'display-01'),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const TallWithVideo = (context) => Default(context);
TallWithVideo.story = {
  name: 'Tall with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasVideo: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
            typeStyle: select('Type style', typeStyleOptions, 'display-01'),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const Medium = (context) => Default(context);

Medium.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
            typeStyle: select('Type style', typeStyleOptions, 'display-01'),
          };
        }),
      }),
    },
  },
};

export const MediumWithImage = (context) => Default(context);

MediumWithImage.story = {
  name: 'Medium with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        hasImage: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
      }),
    },
  },
};

export const MediumWithVideo = (context) => Default(context);

MediumWithVideo.story = {
  name: 'Medium with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        hasVideo: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
      }),
    },
  },
};

export const Short = (args) => {
  const {
    alt,
    defaultSrc,
    hasImage,
    hasVideo,
    navElements,
    size,
    title,
    type,
    highlight,
    typeStyle,
  } = args?.Leadspace ?? {};
  return (
    <C4DLeadspace size={size} type={type} {...(hasImage ? { alt } : {})}>
      {navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      {navElements === navigationOptions[1] ? navigationWithBreadcrumbs : ``}
      <C4DLeadspaceHeading highlight={highlight} type-style={typeStyle}>
        {title}
      </C4DLeadspaceHeading>
      {hasImage && (
        <C4DBackgroundMedia default-src={defaultSrc} alt={alt} opacity="100">
          <C4DImageItem
            media="(min-width: 672px)"
            srcset={leadspaceImg}></C4DImageItem>
          <C4DImageItem
            media="(min-width: 0)"
            srcset={leadspaceImg}></C4DImageItem>
        </C4DBackgroundMedia>
      )}
      {hasVideo && (
        <C4DBackgroundMedia mobilePosition="bottom" opacity="100">
          <C4DVideoPlayerContainer
            video-id="0_ibuqxqbe"
            background-mode="true"></C4DVideoPlayerContainer>
        </C4DBackgroundMedia>
      )}
    </C4DLeadspace>
  );
};

Short.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SHORT,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text(
          'title (title)',
          'A short headline can go on multiple lines in this leadspace'
        ),
      }),
    },
  },
};

export const ShortWithImage = (context) => Short(context);

ShortWithImage.story = {
  name: 'Short with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SHORT,
        hasImage: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text(
          'title (title)',
          'A short headline can go on multiple lines in this leadspace'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
      }),
    },
  },
};

export const ShortWithVideo = (context) => Short(context);

ShortWithVideo.story = {
  name: 'Short with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SHORT,
        hasVideo: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text(
          'title (title)',
          'A short headline can go on multiple lines in this leadspace'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
      }),
    },
  },
};

export const Centered = (context) => Default(context);

Centered.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        type: 'centered',
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
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

export const CenteredWithImage = (context) => Default(context);

CenteredWithImage.story = {
  name: 'Centered with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        hasImage: true,
        type: 'centered',
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
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

export const CenteredWithVideo = (context) => Default(context);

CenteredWithVideo.story = {
  name: 'Centered with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        hasVideo: true,
        type: 'centered',
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
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

export const Super = (context) => Tall(context);

Super.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
            typeStyle: select('Type style', typeStyleOptions, 'display-01'),
          };
        }),
      }),
    },
  },
};

export const SuperWithImage = (context) => Tall(context);

SuperWithImage.story = {
  name: 'Super with image',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        hasImage: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
      }),
    },
  },
};

export const SuperWithVideo = (context) => Tall(context);

SuperWithVideo.story = {
  name: 'Super with video',
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        hasVideo: true,
        navElements: select(
          'navigation elements (optional)',
          navigationOptions,
          navigationOptions[2]
        ),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text(
          'copy (copy)',
          'Use this area for a short line of copy to support the title'
        ),
        alt: text('Image alt text (alt)', 'Image alt text'),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => {
          const icon =
            select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right']) ??
            0;
          return {
            href: text(`Link ${i + 1}`, `https://example.com`),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        defaultSrc: text('Default image (defaultSrc)', leadspaceImg),
        typeStyle: select('Type style', typeStyleOptions, 'display-01'),
      }),
    },
  },
};

export default {
  title: 'Components/Leadspace',
  decorators: [
    (story) => {
      return <div className="cds--grid cds--no-gutter">{story()}</div>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
