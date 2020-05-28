/**
 * Copyright IBM Corp. 2016, 2020
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
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../';
import React from 'react';
import readme from '../README.stories.mdx';

const knobProps = {
  cardProps: () => ({
    image: boolean('image', false),
    eyebrow: text('eyebrow', 'eyebrow text'),
    heading: text('title (required)', 'Lorem ipsum dolor sit amet'),
    copy: text('copy', ''),
    cta: object('cta', {
      type: 'local',
      copy: 'click here',
      href: 'https://example.com',
      icon: {
        src: ArrowRight20,
      },
    }),
    inverse: boolean('inverse', false),
  }),
};

export default {
  title: 'Components|Card',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Static = () => {
  const themes = {
    white: '',
    g10: 'g10',
    g90: 'g90',
    g100: 'g100',
  };
  const image = knobProps.cardProps().image
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
            <Card {...knobProps.cardProps()} image={image} type="static" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LinkClickable = () => {
  const themes = {
    white: '',
    g10: 'g10',
    g90: 'g90',
    g100: 'g100',
  };
  const image = knobProps.cardProps().image
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
            <Card {...knobProps.cardProps()} image={image} type="link" />
          </div>
        </div>
      </div>
    </div>
  );
};

LinkClickable.story = {
  name: 'Link/Clickable',
};
