import { select, withKnobs } from '@storybook/addon-knobs';
import CTASection from '../CTASection';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|CTASection', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const types = ['local', 'external'];
    const ctaProps = {
      style: 'button',
      type: select('CTA type', types, types[0]),
      buttons: [
        {
          type: select('CTA type', types, types[0]),
          copy: ['Book time with an expert'],
        },
      ],
    };

    const contentBlockProps = {
      heading: 'Take the next step',
      copy: `Want to discuss your options with a DevOps expert?`,
    };

    return <CTASection {...contentBlockProps} cta={ctaProps} />;
  });
