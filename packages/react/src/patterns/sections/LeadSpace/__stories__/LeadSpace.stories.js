import './index.scss';
import { ArrowDown20, ArrowRight20, Pdf20 } from '@carbon/icons-react';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { DDS_LEADSPACE } from '../../../../internal/FeatureFlags';
import LeadSpace from '../LeadSpace';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_LEADSPACE) {
  storiesOf('Patterns (Sections)|LeadSpace', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default with no image', () => {
      const copy = text(
        'copy',
        'Use this area for a short line of copy to support the title'
      );

      const title = text('title', 'Lead space title');

      const variations = {
        expressive: '',
        productive: 'productive',
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
            iconMap[select('primary button icon', icons, icons.ArrowRight)],
          href: text('Primary button link:', 'https://www.example.com'),
        },
        {
          link: '',
          copy: text('Secondary button copy:', 'Secondary action button'),
          renderIcon:
            iconMap[select('secondary button icon', icons, icons.ArrowRight)],
          href: text('Secondary button link:', 'https://www.example.com'),
        },
      ];

      const themes = {
        g100: 'g100',
        white: '',
      };

      return (
        <LeadSpace
          theme={select('theme', themes, themes.g100)}
          title={title}
          copy={copy}
          buttons={buttons}
          variation={select('variation', variations, variations.expressive)}
        />
      );
    })
    .add('Default with image', () => {
      const copy = text(
        'copy',
        'Use this area for a short line of copy to support the title'
      );

      const title = text('title', 'Lead space title');

      const variations = {
        expressive: '',
        productive: 'productive',
      };

      const images = {
        mobile: 'https://dummyimage.com/320x370/ee5396/161616',
        tablet: 'https://dummyimage.com/672x400/ee5396/161616',
        default: 'https://dummyimage.com/1056x480/ee5396/161616',
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
            iconMap[select('primary button icon', icons, icons.ArrowRight)],
          href: text('Primary button link:', 'https://www.example.com'),
        },
        {
          link: '',
          copy: text('Secondary button copy:', 'Secondary action button'),
          renderIcon:
            iconMap[select('secondary button icon', icons, icons.ArrowRight)],
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
          theme={select('theme', themes, themes.g100)}
          title={title}
          copy={copy}
          gradient={gradient}
          buttons={buttons}
          image={object('image', images)}
          variation={select('variation', variations, variations.expressive)}
        />
      );
    });
}
