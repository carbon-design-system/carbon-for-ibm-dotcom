import './index.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|Card', module)
  .addDecorator(withKnobs)
  .addDecorator(Story => {
    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            <Story />
          </div>
        </div>
      </div>
    );
  })
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Static', () => {
    const title = text('title (required)', 'Lorem ipsum dolor sit amet');
    const type = text('type', 'static');
    const copy = text('copy', '');
    const cta = {
      icon: ArrowRight20,
      type: 'local',
      href: text('href (required)', 'https://example.com'),
    };
    const target = text('target', '');
    const ratio = {
      none: null,
      '2:1': '2x1',
      '16:9': '16x9',
      '3:2 (not available in Carbon)': '3x2',
      '4:3': '4x3',
      '1:1': '1x1',
    };

    return !select('Ratio', ratio, ratio['none']) ? (
      <Card title={title} copy={copy} cta={cta} target={target} type={type} />
    ) : (
      <div
        className={`bx--aspect-ratio bx--aspect-ratio--${select(
          'Ratio',
          ratio,
          ratio['none']
        )}`}>
        <Card
          title={title}
          copy={copy}
          cta={cta}
          target={target}
          type={type}
          className="bx--aspect-ratio--object"
        />
      </div>
    );
  })
  .add('Link/Clickable', () => {
    const title = text('title (required)', 'Lorem ipsum dolor sit amet');
    const type = text('type', 'link');
    const copy = text('copy', '');
    const cta = {
      icon: ArrowRight20,
      type: 'local',
      href: text('href (required)', 'https://example.com'),
    };
    const target = text('target', '');
    const ratio = {
      none: null,
      '2:1': '2x1',
      '16:9': '16x9',
      '3:2 (not available in Carbon)': '3x2',
      '4:3': '4x3',
      '1:1': '1x1',
    };

    return !select('Ratio', ratio, ratio['none']) ? (
      <Card
        title={title}
        copy={copy}
        cta={cta}
        icon={ArrowRight20}
        target={target}
        type={type}
      />
    ) : (
      <div
        className={`bx--aspect-ratio bx--aspect-ratio--${select(
          'Ratio',
          ratio,
          ratio['none']
        )}`}>
        <Card
          title={title}
          copy={copy}
          cta={cta}
          target={target}
          type={type}
          className="bx--aspect-ratio--object"
        />
      </div>
    );
  });
