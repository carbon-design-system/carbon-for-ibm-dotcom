import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  object,
  boolean,
} from '@storybook/addon-knobs';
import './index.scss';
import LeadSpace from '../LeadSpace';
import readme from '../README.md';
import { DDS_LEADSPACE } from '../../../internal/FeatureFlags';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';

if (DDS_LEADSPACE) {
  storiesOf('LeadSpace', module)
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
          copy: 'Primary action button',
          renderIcon:
            iconMap[select('primary button icon', icons, icons.ArrowRight)],
          href: 'https://www.example.com',
        },
        {
          link: '',
          copy: 'Secondary',
          renderIcon:
            iconMap[select('secondary button icon', icons, icons.ArrowRight)],
          href: 'https://www.example.com',
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
        mobile: 'https://picsum.photos/id/1076/320/370',
        tablet: 'https://picsum.photos/id/1076/672/400',
        default: 'https://picsum.photos/id/1076/1056/480',
        alt: 'lead space image',
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
          copy: 'Primary action button',
          renderIcon:
            iconMap[select('primary button icon', icons, icons.ArrowRight)],
          href: 'https://www.example.com',
        },
        {
          link: '',
          copy: 'Secondary',
          renderIcon:
            iconMap[select('secondary button icon', icons, icons.ArrowRight)],
          href: 'https://www.example.com',
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
