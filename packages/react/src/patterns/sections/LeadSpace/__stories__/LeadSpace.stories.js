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

const type = {
  left: '',
  small: 'small',
};

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
  title: 'Patterns (Sections)|LeadSpace',

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
          type: select('type', type, type.small, groupId),
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
  const { type, title, copy, gradient, buttons, image } =
    parameters?.props?.LeadSpace ?? {};
  const theme = document.documentElement.getAttribute('storybook-carbon-theme');
  return (
    <LeadSpace
      type={type}
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
  const theme = document.documentElement.getAttribute('storybook-carbon-theme');
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
