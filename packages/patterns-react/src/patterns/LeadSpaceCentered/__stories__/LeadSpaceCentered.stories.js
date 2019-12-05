import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';
import {
  withKnobs,
  text,
  select,
  object,
  boolean,
} from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/leadspace-centered/_leadspace-centered.scss';
import LeadSpaceCentered from '../LeadSpaceCentered';
import readme from '../README.md';
import { DDS_LEADSPACE_CENTERED } from '../../../internal/FeatureFlags';

if (DDS_LEADSPACE_CENTERED) {
  storiesOf('LeadSpace - Centered', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Centered with no image', () => {
      const copy = text(
        'copy',
        'Blockchain is a shared, immutable ledger for the process of recording transactions and tracking assets (tangible or intangible) in a business network.'
      );

      const title = text('title', 'What is artificial intelligence?');

      const buttons = [
        {
          link: '',
          copy: 'Primary action button',
          renderIcon: ArrowDown20,
        },
        {
          link: '',
          copy: 'Secondary action button',
          renderIcon: ArrowRight20,
        },
      ];

      const themes = {
        g100: 'g100',
        white: '',
      };

      return (
        <LeadSpaceCentered
          title={title}
          copy={copy}
          theme={select('theme', themes, themes.g100)}
          buttons={object('buttons', buttons)}
        />
      );
    })
    .add('Centered with image', () => {
      const copy = text(
        'copy',
        'Blockchain is a shared, immutable ledger for the process of recording transactions and tracking assets (tangible or intangible) in a business network.'
      );

      const title = text('title', 'What is artificial intelligence?');

      const image = {
        url: 'https://picsum.photos/id/1076/1056/480',
        alt: 'building',
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
        },
        {
          link: '',
          copy: 'Secondary',
          renderIcon:
            iconMap[select('secondary button icon', icons, icons.ArrowRight)],
        },
      ];

      const themes = {
        g100: 'g100',
        white: '',
      };

      const graident = boolean('gradient overlay', true);

      return (
        <LeadSpaceCentered
          title={title}
          copy={copy}
          gradient={graident}
          buttons={buttons}
          theme={select('theme', themes, themes.g100)}
          image={object('image', image)}
        />
      );
    });
}
