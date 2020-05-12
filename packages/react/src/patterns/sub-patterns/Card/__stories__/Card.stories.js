/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  select,
  text,
  withKnobs,
  boolean,
  object,
} from '@storybook/addon-knobs';
import { Card } from '../';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

const props = {
  cardProps: () => ({
    image: boolean('image', false),
    eyebrow: text('eyebrow', 'eyebrow text'),
    heading: text('title (required)', 'Lorem ipsum dolor sit amet'),
    copy: text('copy', ''),
    cta: object('cta', {
      type: 'local',
      copy: 'click here',
      href: 'https://example.com',
    }),
    inverse: boolean('inverse', false),
  }),
};

storiesOf('Patterns (Sub-Patterns)|Card', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Static', () => {
    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };
    const image = props.cardProps().image
      ? {
          defaultSrc: 'https://dummyimage.com/600x300/ee5396/161616&text=2:1',
          alt: 'Image alt text',
        }
      : null;

    return (
      <div className={`bx--card--${select('theme', themes, themes.white)}`}>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
              <Card {...props.cardProps()} image={image} type="static" />
            </div>
          </div>
        </div>
      </div>
    );
  })
  .add('Link/Clickable', () => {
    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };
    const image = props.cardProps().image
      ? {
          defaultSrc: 'https://dummyimage.com/600x300/ee5396/161616&text=2:1',
          alt: 'Image alt text',
        }
      : null;

    return (
      <div className={`bx--card--${select('theme', themes, themes.white)}`}>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
              <Card {...props.cardProps()} image={image} type="link" />
            </div>
          </div>
        </div>
      </div>
    );
  });
