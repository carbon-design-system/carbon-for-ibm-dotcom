import './index.scss';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import ContentGroup from '../ContentGroup';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|ContentGroup', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text(
      'Component heading(required):',
      'Lorem ipsum dolor sit amet.'
    );
    const renderCTA = boolean('render CTA', true);
    const cta = {
      title: renderCTA && text('CTA heading', 'Lorem ipsum dolor sit amet'),
      href: renderCTA && text('href', 'https://ibm.com'),
    };

    return (
      <div className="bx--grid ">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentGroup heading={heading} {...(renderCTA && { ...cta })} />
          </div>
        </div>
      </div>
    );
  });
