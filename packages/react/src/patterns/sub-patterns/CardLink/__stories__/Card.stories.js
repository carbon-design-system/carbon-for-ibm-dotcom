import './index.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '../';
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
  .add('Link', () => {
    const title = text('title (required)', 'Lorem ipsum dolor sit amet');
    const href = text('href (required)', 'https://example.com');
    const content = text('content', '');
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
      <CardLink
        title={title}
        href={href}
        content={content}
        icon={<ArrowRight20 />}
        target={target}
      />
    ) : (
      <div
        className={`bx--aspect-ratio bx--aspect-ratio--${select(
          'Ratio',
          ratio,
          ratio['none']
        )}`}>
        <CardLink
          title={title}
          href={href}
          content={content}
          icon={<ArrowRight20 />}
          target={target}
          className="bx--aspect-ratio--object"
        />
      </div>
    );
  });
