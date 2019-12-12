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

      /**
       * Return icon component based on the parameter
       *
       * @param {string} icon icon name parameter
       * @returns {*} Icon JSX component or null
       */
      const selectIcon = icon => {
        switch (icon) {
          case 'ArrowRight':
            return ArrowRight20;
          case 'ArrowDown':
            return ArrowDown20;
          case 'Pdf':
            return Pdf20;
          default:
            return null;
        }
      };

      const availableIcons = {
        ArrowRight: 'ArrowRight',
        ArrowDown: 'ArrowDown',
        Pdf: 'Pdf',
        None: 'None',
      };

      const button1Icon = select(
        'Button1 Icon',
        availableIcons,
        availableIcons.ArrowRight
      );
      const button2Icon = select(
        'Button2 Icon',
        availableIcons,
        availableIcons.ArrowDown
      );

      const buttons = [
        {
          link: text('Button2 link:', ''),
          copy: text('Button2 label:', 'Primary action'),
          renderIcon: selectIcon(button2Icon),
        },
        {
          link: text('Button1 link:', ''),
          copy: text('Button1 label:', 'Secondary action'),
          renderIcon: selectIcon(button1Icon),
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
          buttons={object('buttons', buttons)}
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

      /**
       * Return icon component based on the parameter
       *
       * @param {string} icon icon name parameter
       * @returns {*} Icon JSX component or null
       */
      const selectIcon = icon => {
        switch (icon) {
          case 'ArrowRight':
            return ArrowRight20;
          case 'ArrowDown':
            return ArrowDown20;
          case 'Pdf':
            return Pdf20;
          default:
            return null;
        }
      };

      const availableIcons = {
        ArrowRight: 'ArrowRight',
        ArrowDown: 'ArrowDown',
        Pdf: 'Pdf',
        None: 'None',
      };

      const button1Icon = select(
        'Button1 Icon',
        availableIcons,
        availableIcons.ArrowRight
      );
      const button2Icon = select(
        'Button2 Icon',
        availableIcons,
        availableIcons.ArrowDown
      );

      const buttons = [
        {
          href: text('Button1 link:', ''),
          copy: text('Button1 label:', 'Primary action'),
          renderIcon: selectIcon(button1Icon),
        },
        {
          href: text('Button2 link:', ''),
          copy: text('Button2 label:', 'Secondary action'),
          renderIcon: selectIcon(button2Icon),
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
