import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import '../../../../../styles/scss/components/leadspace/_leadspace.scss';
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

    const imageUrl = text('imageUrl', 'https://picsum.photos/id/603/1000/400');
    const buttons = [
      {
        link: '',
        copy: 'Secondary action',
        arrowIcon: false,
      },
      {
        link: '',
        copy: 'Primary action',
        arrowIcon: true,
      },
    ];

    return (
      <LeadSpace
        title={title}
        copy={copy}
        buttons={buttons}
        imageUrl={imageUrl}
      />
    );
  });
