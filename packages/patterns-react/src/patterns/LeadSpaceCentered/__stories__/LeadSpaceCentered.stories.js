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
import '../../../../../styles/scss/patterns/leadspace-centered/index.scss';
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
        'dark (g100)': 'g100',
        'light (white)': '',
      };

      return (
        <div
          className={`bx--leadspace--${select(
            'theme',
            themes,
            themes['dark (g100)']
          )}`}>
          <LeadSpaceCentered
            title={title}
            copy={copy}
            buttons={object('buttons', buttons)}
          />
        </div>
      );
    })
    .add('Centered with image', () => {
      const copy = text(
        'copy',
        'Blockchain is a shared, immutable ledger for the process of recording transactions and tracking assets (tangible or intangible) in a business network.'
      );

      const title = text('title', 'What is artificial intelligence?');

      const image = 'https://picsum.photos/id/1076/1056/480';

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
        'dark (g100)': 'g100',
        'light (white)': '',
      };

      const graident = boolean('gradient overlay', true);

      return (
        <div
          className={`bx--leadspace--${select(
            'theme',
            themes,
            themes['dark (g100)']
          )}`}>
          <LeadSpaceCentered
            title={title}
            copy={copy}
            gradient={graident}
            buttons={buttons}
            image={object('image', image)}
          />
        </div>
      );
    });
}
