import './index.scss';
import { ArrowDown20, ArrowRight20, Pdf20 } from '@carbon/icons-react';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import LeadSpace from '../LeadSpace';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|LeadSpace', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default with no image', () => {
    const copy = text(
      'Copy',
      'Use this area for a short line of copy to support the title'
    );

    const title = text('Title', 'Lead space title');

    const type = {
      left: '',
      small: 'small',
      centered: 'centered',
    };

    const iconMap = {
      ArrowRight20,
      ArrowDown20,
      Pdf20,
    };

    const icons = {
      ArrowRight: 'ArrowRight20',
      ArrowDown: 'ArrowDown20',
      Pdf: 'Pdf20',
      none: null,
    };

    const buttons = [
      {
        link: '',
        copy: text('Primary button copy:', 'Primary action button'),
        renderIcon:
          iconMap[select('Primary button icon', icons, icons.ArrowRight)],
        href: text('Primary button link:', 'https://www.example.com'),
      },
      {
        link: '',
        copy: text('Secondary button copy:', 'Secondary action button'),
        renderIcon:
          iconMap[select('Secondary button icon', icons, icons.ArrowRight)],
        href: text('Secondary button link:', 'https://www.example.com'),
      },
    ];

    const themes = {
      g100: 'g100',
      white: '',
    };

    return (
      <LeadSpace
        type={select('Type', type, type.small)}
        theme={select('Theme', themes, themes.g100)}
        title={title}
        copy={copy}
        buttons={buttons}
      />
    );
  })
  .add('Default with image', () => {
    const copy = text(
      'Copy',
      'Use this area for a short line of copy to support the title'
    );

    const title = text('Title', 'Lead space title');

    const type = {
      left: '',
      small: 'small',
      centered: 'centered',
    };

    const images = {
      sources: [
        {
          src: 'https://dummyimage.com/320x370',
          breakpoint: 'sm',
        },
        {
          src: 'https://dummyimage.com/672x400',
          breakpoint: 'md',
        },
      ],
      default: 'https://dummyimage.com/1056x480',
      alt: 'Image alt text',
    };

    const iconMap = {
      ArrowRight20,
      ArrowDown20,
      Pdf20,
    };

    const icons = {
      ArrowRight: 'ArrowRight20',
      ArrowDown: 'ArrowDown20',
      Pdf: 'Pdf20',
      none: null,
    };

    const buttons = [
      {
        link: '',
        copy: text('Primary button copy:', 'Primary action button'),
        renderIcon:
          iconMap[select('Primary button icon', icons, icons.ArrowRight)],
        href: text('Primary button link:', 'https://www.example.com'),
      },
      {
        link: '',
        copy: text('Secondary button copy:', 'Secondary action button'),
        renderIcon:
          iconMap[select('Secondary button icon', icons, icons.ArrowRight)],
        href: text('Secondary button link:', 'https://www.example.com'),
      },
    ];

    const themes = {
      g100: 'g100',
      white: '',
    };

    const gradient = boolean('gradient overlay', true);

    return (
      <LeadSpace
        type={select('Type', type, type.small)}
        theme={select('Theme', themes, themes.g100)}
        title={title}
        copy={copy}
        gradient={gradient}
        buttons={buttons}
        image={object('Image', images)}
      />
    );
  });
