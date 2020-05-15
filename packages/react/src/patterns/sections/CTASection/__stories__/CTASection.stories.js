import './index.scss';
import { select, text, object, withKnobs } from '@storybook/addon-knobs';
import CTASection from '../CTASection';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Patterns (Sections)|CTASection',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const types = ['local', 'external'];
  const ctaProps = {
    style: 'button',
    type: types[0],
    buttons: [
      {
        type: select('ContentBlock | CTA type', types, types[0]),
        copy: text('ContentBlock | CTA copy', 'Contact sales'),
        href: 'https://example.com/',
      },
    ],
  };

  const contentBlockProps = {
    heading: text('ContentBlock | heading:', 'Take the next step'),
    copy: text(
      'ContentBlock | copy:',
      `Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.`
    ),
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
        type: types[0],
        href: 'https://example.com/',
      },
    },
    {
      heading: 'Learn how',
      copy: 'Dig into more self-directed learning about DevOps methodologies.',
      cta: {
        copy: 'Browse tutorials',
        type: types[0],
        href: 'https://example.com/',
      },
    },
  ];

  return (
    <CTASection
      {...contentBlockProps}
      cta={ctaProps}
      items={object('ContentItems | Data', contentItemsProps)}
    />
  );
};
