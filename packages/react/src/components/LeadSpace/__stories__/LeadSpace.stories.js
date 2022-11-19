/**
 * Copyright IBM Corp. 2016, 2022
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

const props = {
  tallWithNoImage: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Lead space title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      buttons,
    };
  },
  tallWithImage: () => {
    const knobs = props.tallWithNoImage();
    return {
      ...knobs,
      defaultSrc: text('Default image (defaultSrc):', leadspaceImg),
      image: images,
    };
  },
  centered: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Leadspace Title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      buttons,
    };
  },
  centeredWithImage: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Leadspace Title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      defaultSrc: text('Default image (defaultSrc):', leadspaceImg3),
      buttons,
    };
  },
  medium: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Lead space title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      buttons,
      size: 'medium',
    };
  },
  mediumWithImage: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Lead space title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      buttons,
      defaultSrc: text('Default image (defaultSrc):', leadspaceImg),
      size: 'medium',
      image: images,
      gradient: true,
    };
  },
  super: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Lead space title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      buttons,
      size: 'super',
    };
  },
  superWithImage: () => {
    const buttonCount = number('Number of buttons', 2, {});
    const buttons = [];

    for (let i = 0; i < buttonCount; i++) {
      buttons.push({
        copy: text(`Button ${i + 1} (copy)`, `Button ${i + 1}`),
        renderIcon:
          iconMap[
            select(
              `Button Icon ${i + 1} (renderIcon)`,
              iconOptions,
              iconOptions.ArrowRight
            )
          ],
        href: text(`Button link (href)`, 'https://www.example.com'),
      });
    }

    return {
      title: text('title (title)', 'Lead space title'),
      copy: text(
        'copy (copy)',
        'Use this area for a short line of copy to support the title'
      ),
      buttons,
      defaultSrc: text('Default image (defaultSrc):', leadspaceImg),
      size: 'super',
      gradient: true,
      image: images,
    };
  },
};

export default {
  title: 'Components/Lead space',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Lead space: Default',
    },
  },
};

export const TallWithNoImage = args => (
  <TallWithImage
    {...(Object.keys(args).length > 0 ? args : props.tallWithNoImage())}
  />
);

TallWithNoImage.story = {
  name: 'Tall',
  parameters: {
    percy: {
      name: 'Components|Lead space: Tall',
    },
  },
};

export const TallWithImage = args => {
  const { defaultSrc, image } = props.tallWithImage();

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
      {...(Object.keys(args).length > 0 ? args : props.tallWithImage())}
    />
  );
};

TallWithImage.story = {
  name: 'Tall with image',
  parameters: {
    percy: {
      name: 'Components|Lead space: Tall with image',
    },
  },
};

export const Centered = () => {
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.has('theme') ? params.get('theme') : null;
  const theme =
    themeParam ||
    document.documentElement.getAttribute('storybook-carbon-theme') ||
    'white';
  return <LeadSpace type="centered" theme={theme} {...props.centered()} />;
};

Centered.story = {
  name: 'Centered',
  parameters: {
    percy: {
      name: 'Components|Lead space: Centered',
    },
  },
};

export const CenteredWithImage = () => {
  const { defaultSrc } = props.centeredWithImage();
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
      {...props.centeredWithImage()}
      image={centeredImage}
    />
  );
};

CenteredWithImage.story = {
  name: 'Centered with image',
  parameters: {
    percy: {
      name: 'Components|Lead space: Centered with image',
    },
  },
};

export const Medium = () => <TallWithNoImage {...props.medium()} />;

Medium.story = {
  name: 'Medium',
  parameters: {
    percy: {
      name: 'Components|Lead space: Medium',
    },
  },
};

export const MediumWithImage = () => (
  <TallWithImage {...props.mediumWithImage()} />
);

MediumWithImage.story = {
  name: 'Medium with image',
  parameters: {
    percy: {
      name: 'Components|Lead space: Medium with image',
    },
  },
};

export const Super = () => <TallWithNoImage {...props.super()} />;

Super.story = {
  name: 'Super',
  parameters: {
    percy: {
      name: 'Components|Lead space: Super',
    },
  },
};

export const SuperWithImage = () => (
  <TallWithImage {...props.superWithImage()} />
);

SuperWithImage.story = {
  name: 'Super with image',
  parameters: {
    percy: {
      name: 'Components|Lead space: Super with image',
    },
  },
};
