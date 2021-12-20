/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import LeadSpace from '../LeadSpace';
import leadspaceImg from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import leadspaceImg3 from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
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
    { src: leadspaceImg, breakpoint: 'sm' },
    { src: leadspaceImg, breakpoint: 'md' },
  ],
  defaultSrc: leadspaceImg,
  alt: 'lead space image',
};

export default {
  title: 'Components|Lead space',
  parameters: {
    ...readme.parameters,
  },
};

export const TallWithNoImage = ({ parameters }) => (
  <TallWithImage parameters={parameters} />
);

TallWithNoImage.story = {
  name: 'Tall',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Lead space title', groupId),
          copy: text(
            'copy (copy)',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
        };
      },
    },
  },
};

export const TallWithImage = ({ parameters }) => {
  const { title, defaultSrc, copy, gradient, buttons, image, size } =
    parameters?.props?.LeadSpace ?? {};
  if (defaultSrc) {
    image.defaultSrc = defaultSrc;
    image.sources[0].src = defaultSrc;
    image.sources[1].src = defaultSrc;
  }
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.has('theme') ? params.get('theme') : null;
  const theme =
    themeParam ||
    document.documentElement.getAttribute('storybook-carbon-theme') ||
    'white';
  return (
    <LeadSpace
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={image}
      size={size}
    />
  );
};

TallWithImage.story = {
  name: 'Tall with image',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const knobs = TallWithNoImage.story.parameters.knobs.LeadSpace({
          groupId,
        });
        return {
          ...knobs,
          defaultSrc: text(
            'Default image (defaultSrc):',
            leadspaceImg,
            groupId
          ),
          image: images,
        };
      },
    },
  },
};

export const Centered = ({ parameters }) => {
  const { title, copy, gradient, buttons, image } =
    parameters?.props?.Leadspace ?? {};
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.has('theme') ? params.get('theme') : null;
  const theme =
    themeParam ||
    document.documentElement.getAttribute('storybook-carbon-theme') ||
    'white';
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
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Leadspace Title', groupId),
          copy: text(
            'copy (copy)',
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
  const { title, copy, gradient, buttons, defaultSrc } =
    parameters?.props?.Leadspace ?? {};
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.has('theme') ? params.get('theme') : null;
  const theme =
    themeParam ||
    document.documentElement.getAttribute('storybook-carbon-theme') ||
    'white';

  const centeredImage = {
    sources: [
      {
        src: leadspaceImg3,
        breakpoint: 'sm',
      },
      {
        src: leadspaceImg3,
        breakpoint: 'md',
      },
    ],
    defaultSrc: leadspaceImg3,
    alt: 'lead space image',
  };
  if (defaultSrc) {
    centeredImage.defaultSrc = defaultSrc;
    centeredImage.sources[0].src = defaultSrc;
    centeredImage.sources[1].src = defaultSrc;
  }
  return (
    <LeadSpace
      type="centered"
      theme={theme}
      title={title}
      copy={copy}
      gradient={gradient}
      buttons={buttons}
      image={centeredImage}
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
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Leadspace Title', groupId),
          copy: text(
            'copy (copy)',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          defaultSrc: text(
            'Default image (defaultSrc):',
            leadspaceImg3,
            groupId
          ),
          buttons,
        };
      },
    },
  },
};

export const Medium = ({ parameters }) => (
  <TallWithNoImage parameters={parameters} />
);

Medium.story = {
  name: 'Medium',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Lead space title', groupId),
          copy: text(
            'copy (copy)',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
          size: 'medium',
        };
      },
    },
  },
};

export const MediumWithImage = ({ parameters }) => (
  <TallWithNoImage parameters={parameters} />
);

MediumWithImage.story = {
  name: 'Medium with image',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Lead space title', groupId),
          copy: text(
            'copy (copy)',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
          defaultSrc: text(
            'Default image (defaultSrc):',
            leadspaceImg,
            groupId
          ),
          size: 'medium',
          image: images,
          gradient: true,
        };
      },
    },
  },
};

export const Super = ({ parameters }) => (
  <TallWithNoImage parameters={parameters} />
);

Super.story = {
  name: 'Super',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Lead space title', groupId),
          copy: text(
            'copy (copy)',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
          size: 'super',
        };
      },
    },
  },
};

export const SuperWithImage = ({ parameters }) => (
  <TallWithNoImage parameters={parameters} />
);

SuperWithImage.story = {
  name: 'Super with image',
  parameters: {
    knobs: {
      LeadSpace: ({ groupId }) => {
        const buttonCount = number('Number of buttons', 2, {}, groupId);
        const buttons = [];

        for (let i = 0; i < buttonCount; i++) {
          buttons.push({
            copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`, groupId),
            renderIcon:
              iconMap[
                select(
                  `Button Icon ${i + 1} (renderIcon)`,
                  iconOptions,
                  iconOptions.ArrowRight,
                  groupId
                )
              ],
            href: text(
              `Button link (href)`,
              'https://www.example.com',
              groupId
            ),
          });
        }

        return {
          title: text('title (title)', 'Lead space title', groupId),
          copy: text(
            'copy (copy)',
            'Use this area for a short line of copy to support the title',
            groupId
          ),
          buttons,
          defaultSrc: text(
            'Default image (defaultSrc):',
            leadspaceImg,
            groupId
          ),
          size: 'super',
          gradient: true,
          image: images,
        };
      },
    },
  },
};
