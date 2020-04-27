import './index.scss';
import { text, withKnobs, object } from '@storybook/addon-knobs';
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
    const heading = text('heading (required):', 'Tutorials');
    const headlines = [
      'Containerization A Complete Guide',
      'Why should you use microservices and containers',
    ];
    const types = ['local', 'external', 'video'];
    const items = [
      {
        type: types[0],
        copy: headlines[0],
        cta: {
          href: 'https://ibm.com',
        },
      },
      {
        type: types[0],
        copy: headlines[1],
        cta: {
          href: 'https://ibm.com',
        },
      },
      {
        type: types[2],
        media: {
          src: '0_uka1msg4',
          type: 'video',
        },
      },
    ];

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
            <LinkList heading={heading} items={object('Items array ', items)} />
          </div>
        </div>
      </div>
    );
  });
