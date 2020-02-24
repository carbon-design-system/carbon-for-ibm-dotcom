import './index.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import LinkList from '../LinkList';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Sub-Patterns)|LinkList', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('heading(required):', 'Tutorials');
    const types = ['local', 'external'];
    const type = [
      select('cta 1 type', types, types[0]),
      select('cta 2 type', types, types[0]),
    ];
    const items = [
      {
        heading: 'Containerization: A Complete Guide',
        type: type[0],
        style: 'text',
        title: 'Lorem ipsum dolor sit amet',
        href: 'https://ibm.com',
      },
      {
        heading: 'Why should you use microservices and containers?',
        type: type[1],
        style: 'text',
        title: 'Lorem ipsum dolor sit amet',
        href: 'https://ibm.com',
      },
    ];
    return (
      <div className={`${prefix}--grid`}>
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <LinkList heading={heading} items={items} />
          </div>
        </div>
      </div>
    );
  });
