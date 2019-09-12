import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/leadspace/index.scss';
import 'carbon-components/scss/components/button/_button.scss';
import LeadSpace from '../LeadSpace';
import readme from '../README.md';

storiesOf('LeadSpace', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const copy = text(
      'copy',
      'Use this area for a short line of copy to support the title'
    );

    const title = text('title', 'Lead space title');

    const variations = {
      expressive: '',
      productive: 'productive',
    };

    const image = {
      mobile: 'https://picsum.photos/id/1025/320/370',
      tablet: 'https://picsum.photos/id/1025/672/400',
      default: 'https://picsum.photos/id/1025/1056/480',
      alt: 'lead space image',
    };

    const buttons = [
      {
        link: '',
        copy: 'Primary action',
        renderArrow: true,
      },
      {
        link: '',
        copy: 'Secondary action',
        renderArrow: false,
      },
    ];

    const themes = {
      dark: 'g100',
      light: 'white',
    };

    return (
      <LeadSpace
        classname={select('theme', themes, 'g100')}
        title={title}
        copy={copy}
        buttons={object('buttons', buttons)}
        image={object('image', image)}
        variation={select('variation', variations, '')}
      />
    );
  });
