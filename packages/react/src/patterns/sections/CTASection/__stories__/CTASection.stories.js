import './index.scss';
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
          copy: ['Contact sales'],
        },
      ],
    };

    const contentBlockProps = {
      heading: 'Take the next step',
      copy: `Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.`,
    };

    const contentItemsProps = [
      {
        heading: 'Get connected',
        copy: `
          IBM DevOps partners have a wide range of expertise.
          Find one to build the right solution for you.
          `,
        cta: {
          copy: 'Find a partner',
          type: select('ContentItem left | type:', types, types[0]),
          href: 'https://example.com/',
        },
      },
      {
        heading: 'Learn how',
        copy:
          'Dig into more self-directed learning about DevOps methodologies.',
        cta: {
          copy: 'Browse tutorials',
          type: select('ContentItem right | type:', types, types[0]),
          href: 'https://example.com/',
        },
      },
    ];

    return (
      <CTASection
        {...contentBlockProps}
        cta={ctaProps}
        items={contentItemsProps}
      />
    );
  });
