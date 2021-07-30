/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
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

import leadspaceImg from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import readme from './README.stories.react.mdx';
import { LEADSPACE_SIZE } from '../defs';

const title = 'Heading can go on two lines max';
const copy = 'Use this area for a short line of copy to support the title';
const alt = 'Image alt text';

export const Tall = ({ parameters }) => {
  const { size, hasImage, type } = parameters?.props?.Leadspace ?? {};
  return (
    <DDSLeadspace size={size} type={type} {...(hasImage ? { alt } : {})}>
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

export const TallWithImage = context => Tall(context);
TallWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.NONE,
        hasImage: true,
      }),
    },
  },
};

export const Medium = context => Tall(context);

Medium.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
      }),
    },
  },
};

export const MediumWithImage = context => Tall(context);

MediumWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        size: LEADSPACE_SIZE.MEDIUM,
        hasImage: true,
      }),
    },
  },
};

export const Centered = context => Tall(context);

Centered.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        type: 'centered',
      }),
    },
  },
};

export const CenteredWithImage = context => Tall(context);

CenteredWithImage.story = {
  parameters: {
    knobs: {
      Leadspace: () => ({
        hasImage: true,
        type: 'centered',
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
