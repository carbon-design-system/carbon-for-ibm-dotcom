/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
// @ts-ignore
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
// @ts-ignore
import DDSLeadspaceImage from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-image';
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

import leadspaceImg from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import readme from './README.stories.react.mdx';
import { LEADSPACE_SIZE } from '../defs';

const navigationOptions = ['with Tag group (using Tag link)', 'with Breadcrumbs', 'none'];
// const getAriaLabel = type => {
//   switch (type) {
//     case 'ArrowDown20':
//       return 'anchor link';
//     case 'Pdf20':
//       return 'pdf link';
//     default:
//       return '';
//   }
// };

// const iconMap = {
//   ArrowRight20: ArrowRight20({ slot: 'icon' }),
//   ArrowDown20: ArrowDown20({ slot: 'icon' }),
//   // Pdf20: Pdf20({ slot: 'icon' }),
// };

// const iconOptions = {
//   None: null,
//   'Arrow Right': 'ArrowRight20',
//   'Arrow Down': 'ArrowDown20',
//   PDF: 'Pdf20',
// };

const navigationWithTagGroup = (
  <DDSTagGroup slot="navigation">
    <DDSTagLink href={'https://example.com'}>Marketing Analytics</DDSTagLink>
    <DDSTagLink href={'https://example.com'}>Cloud</DDSTagLink>
  </DDSTagGroup>
);

const Default = ({ parameters }) => {
  const { alt, copy, size, hasImage, type, title, navElements } = parameters?.props?.Leadspace ?? {};
  return (
    <DDSLeadspace size={size} type={type} {...(hasImage ? { alt } : {})}>
      {navElements === navigationOptions[0] ? navigationWithTagGroup : ``}
      <DDSLeadspaceHeading>{title}</DDSLeadspaceHeading>
      {copy}
      <DDSButtonGroup slot="action">
        <DDSButtonGroupItem href="https://www.example.com">
          <ArrowRight20 slot="icon" />
          Button 1
        </DDSButtonGroupItem>
        <DDSButtonGroupItem href="https://www.example.com">
          <ArrowRight20 slot="icon" />
          Button 2
        </DDSButtonGroupItem>
      </DDSButtonGroup>
      {hasImage && (
        <DDSLeadspaceImage slot="image" default-src={leadspaceImg} className="bx--image" alt={alt}>
          <DDSImageItem media="(min-width: 672px)" srcset={leadspaceImg}></DDSImageItem>
          <DDSImageItem media="(min-width: 0)" srcset={leadspaceImg}></DDSImageItem>
        </DDSLeadspaceImage>
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
      }),
    },
  },
};

export const TallWithImage = context => Default(context);
TallWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
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
      }),
    },
  },
};

export const MediumWithImage = context => Default(context);

MediumWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
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
      }),
    },
  },
};

export const CenteredWithImage = context => Default(context);

CenteredWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        hasImage: true,
        type: 'centered',
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
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
      }),
    },
  },
};

export const SuperWithImage = context => Tall(context);

SuperWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.SUPER,
        hasImage: true,
        navElements: select('navigation elements (optional)', navigationOptions, navigationOptions[2]),
        title: text('title (title)', 'Heading can go on two lines max'),
        copy: text('copy (copy)', 'Use this area for a short line of copy to support the title'),
        alt: text('Image alt text (alt)', 'Image alt text'),
      }),
    },
  },
};

export default {
  title: 'Components/Leadspace',
  decorators: [
    story => {
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
  },
};
