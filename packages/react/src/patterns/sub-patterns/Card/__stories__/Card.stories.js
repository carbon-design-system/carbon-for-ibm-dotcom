import './index.scss';
import {
  select,
  text,
  withKnobs,
  boolean,
  object,
} from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

const props = {
  cardProps: () => ({
    heading: text('title (required)', 'Lorem ipsum dolor sit amet'),
    type: text('type', 'link'),
    copy: text('copy', ''),
    cta: object('cta', {
      type: 'local',
      copy: '',
      icon: {
        src: ArrowRight20,
      },
      href: 'https://example.com',
    }),
    inverse: boolean('inverse', false),
    image: object('image', {
      defaultImage: 'https://picsum.photos/id/2/600/300',
      alt: 'featured link image',
    }),
    eyebrow: text('eyebrow', 'eyebrow text'),
    target: text('target', ''),
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
    const ratio = {
      none: null,
      '2:1': '2x1',
      '16:9': '16x9',
      '3:2 (not available in Carbon)': '3x2',
      '4:3': '4x3',
      '1:1': '1x1',
    };

    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };

    const type = text('type', 'static');

    const theme = select('theme', themes, themes.g100);

    return (
      <div
        className="bx--grid"
        style={{
          padding: '2rem',
          backgroundColor: theme === 'g10' || theme === '' ? 'black' : 'white',
        }}>
        <div className="bx--row">
          <div className={`bx--card--${theme}`}>
            {!select('Ratio', ratio, ratio['none']) ? (
              <Card {...props.cardProps()} type={type} />
            ) : (
              <div
                className={`bx--aspect-ratio bx--aspect-ratio--${select(
                  'Ratio',
                  ratio,
                  ratio['none']
                )}`}>
                <Card
                  {...props.cardProps()}
                  type={type}
                  customClassName="bx--aspect-ratio--object"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })
  .add('Link/Clickable', () => {
    const ratio = {
      none: null,
      '2:1': '2x1',
      '16:9': '16x9',
      '3:2 (not available in Carbon)': '3x2',
      '4:3': '4x3',
      '1:1': '1x1',
    };

    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };

    const theme = select('theme', themes, themes.g100);

    const type = text('type', 'link');

    return (
      <div
        className="bx--grid"
        style={{
          padding: '2rem',
          backgroundColor: theme === 'g10' || theme === '' ? 'black' : 'white',
        }}>
        <div className="bx--row">
          <div className={`bx--card--${select('theme', themes, themes.g100)}`}>
            {!select('Ratio', ratio, ratio['none']) ? (
              <Card {...props.cardProps()} type={type} />
            ) : (
              <div
                className={`bx--aspect-ratio bx--aspect-ratio--${select(
                  'Ratio',
                  ratio,
                  ratio['none']
                )}`}>
                <Card
                  {...props.cardProps()}
                  type={type}
                  className="bx--aspect-ratio--object"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });
