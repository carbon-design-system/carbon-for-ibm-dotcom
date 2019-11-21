import React from 'react';
import { storiesOf } from '@storybook/react';
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
import { LEADSPACE_CENTERED } from '../../../internal/FeatureFlags';

if (LEADSPACE_CENTERED) {
  storiesOf('LeadSpace - Centered', module)
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
    .add('Default with image', () => {
      const copy = text(
        'copy',
        'Use this area for a short line of copy to support the title'
      );

      const title = text('title', 'Lead space title');

      const image = 'https://picsum.photos/id/1076/1056/480';

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
