/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, object, select, text } from '@storybook/addon-knobs';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import LeadSpace from '../LeadSpace';
import Pdf20 from '@carbon/icons-react/es/PDF/20';
import React from 'react';
import readme from '../README.stories.mdx';

const iconMap = {
  ArrowRight20,
  ArrowDown20,
  Pdf20,
};

const iconOptions = {
  None: null,
  ArrowRight: 'ArrowRight20',
  ArrowDown: 'ArrowDown20',
  PDF: 'Pdf20',
};

const images = {
  sources: [
    { src: 'https://picsum.photos/id/1076/320/370', breakpoint: 'sm' },
    { src: 'https://picsum.photos/id/1076/672/400', breakpoint: 'md' },
  ],
  defaultSrc: 'https://picsum.photos/id/1076/1056/480',
  alt: 'lead space image',
};

export default {
  title: 'Components|LeadSpace',

  parameters: {
    ...readme.parameters,
  },
};

export const DefaultWithNoImage = ({ parameters }) => (
  <DefaultWithImage parameters={parameters} />
);

DefaultWithNoImage.story = {
  name: 'Default with no image',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1}`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              'Primary button link',
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title', 'Lead space title', groupId),
          copy: text(
            'copy',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
        };
      },
    },
  },
};

export const DefaultWithImage = ({ parameters }) => {
  const { title, copy, gradient, buttons, image } =
    parameters?.props?.LeadSpace ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <LeadSpace
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={image}
    />
  );
};

DefaultWithImage.story = {
  name: 'Default with image',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const knobs = DefaultWithNoImage.story.parameters.knobs.LeadSpace({
          groupId,
        });
        return {
          ...knobs,
          gradient: boolean('gradient overlay', true, groupId),
          image: object('image', images, groupId),
        };
      },
    },
  },
};

export const Centered = ({ parameters }) => {
  const { title, copy, gradient, buttons, image } =
    parameters?.props?.Leadspace ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <LeadSpace
      type="centered"
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={image}
    />
  );
};

Centered.story = {
  name: 'Centered',
  parameters: {
    knobs: {
      Leadspace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1}`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              'Primary button link',
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title', 'Leadspace Title', groupId),
          copy: text(
            'copy',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
        };
      },
    },
  },
};

export const CenteredWithImage = ({ parameters }) => {
  const { title, copy, gradient, buttons } = parameters?.props?.Leadspace ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <LeadSpace
      type="centered"
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={{
        sources: [
          {
            src: 'https://dummyimage.com/320x370/ee5396/ee5396',
            breakpoint: 'sm',
          },
          {
            src: 'https://dummyimage.com/672x400/ee5396/ee5396',
            breakpoint: 'md',
          },
        ],
        defaultSrc: 'https://dummyimage.com/1056x480/ee5396/ee5396',
        alt: 'lead space image',
      }}
    />
  );
};

CenteredWithImage.story = {
  name: 'Centered with image',
  parameters: {
    knobs: {
      Leadspace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1}`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              'Primary button link',
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title', 'Leadspace Title', groupId),
          copy: text(
            'copy',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          gradient: boolean('gradient overlay', true, groupId),
          buttons,
        };
      },
    },
  },
};

export const Small = ({ parameters }) => {
  const { title, copy, gradient, buttons, image } =
    parameters?.props?.Leadspace ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <LeadSpace
      type="small"
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={image}
    />
  );
};

Small.story = {
  name: 'Small',
  parameters: {
    knobs: {
      Leadspace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1}`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              'Primary button link',
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title', 'Leadspace Title', groupId),
          copy: text(
            'copy',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
        };
      },
    },
  },
};

export const SmallWithImage = ({ parameters }) => {
  const { title, copy, gradient, buttons, image } =
    parameters?.props?.Leadspace ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <LeadSpace
      type="small"
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={image}
    />
  );
};

SmallWithImage.story = {
  name: 'Small with image',
  parameters: {
    knobs: {
      Leadspace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1}`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              'Primary button link',
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title', 'Leadspace Title', groupId),
          copy: text(
            'copy',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          gradient: boolean('gradient overlay', true, groupId),
          image: object('image', images, groupId),
          buttons,
        };
      },
    },
  },
};
