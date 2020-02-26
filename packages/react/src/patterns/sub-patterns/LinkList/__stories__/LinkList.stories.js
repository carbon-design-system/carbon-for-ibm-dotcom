import './index.scss';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import LinkList from '../LinkList';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|LinkList', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('heading(required):', 'Tutorials');
    const headlines = [
      'Containerization A Complete Guide',
      'Why should you use microservices and containers',
    ];
    const types = ['local', 'external'];
    const type = [
      select('cta 1 type', types, types[0]),
      select('cta 2 type', types, types[0]),
    ];

    const items = [
      {
        type: type[0],
        copy: headlines[0],
        href: 'https://ibm.com',
      },
      {
        type: type[1],
        copy: headlines[1],
        href: 'https://ibm.com',
      },
    ];

    const itemsCount = number('Number of items', 0);

    for (let i = 0; i < itemsCount; i++) {
      items.push({
        type: type[0],
        copy: headlines[i],
        href: 'https://ibm.com',
      });
    }
    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-12">
            <LinkList heading={heading} items={items} />
          </div>
        </div>
      </div>
    );
  });
