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
import { LEADSPACE } from '../../../internal/FeatureFlags';

if (LEADSPACE) {
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

      const buttons = [
        {
          link: '',
          copy: 'Primary action button',
          renderIcon: 'ArrowDown',
        },
        {
          link: '',
          copy: 'Secondary action button',
          renderIcon: 'ArrowRight',
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

      const icons = {
        ArrowRight: 'ArrowRight',
        ArrowDown: 'ArrowDown',
        Pdf: 'Pdf',
        none: 'none',
      };

      const buttons = [
        {
          link: '',
          copy: 'Primary action button',
          renderIcon: select('primary button icon', icons, icons.ArrowRight),
        },
        {
          link: '',
          copy: 'Secondary',
          renderIcon: select('secondary button icon', icons, icons.ArrowRight),
        },
      ];

      const themes = {
        g100: 'g100',
        white: '',
      };

      const graident = boolean('gradient overlay', true);

      return (
        <LeadSpace
          theme={select('theme', themes, themes.g100)}
          title={title}
          copy={copy}
          gradient={graident}
          buttons={buttons}
          image={object('image', images)}
          variation={select('variation', variations, variations.expressive)}
        />
      );
    });
}
