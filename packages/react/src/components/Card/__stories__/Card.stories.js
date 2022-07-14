/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import Bee from '@carbon/pictograms-react/lib/bee';
import { Card } from '../';
import { DDS_CARD_WITH_PICTOGRAM } from '../../../internal/FeatureFlags';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

const props = {
  default: () => {
    const showPictogram = DDS_CARD_WITH_PICTOGRAM
      ? boolean('Show pictogram (hides CTA)', false)
      : null;
    const image =
      (boolean('Add image:', false) && {
        defaultSrc: imgXlg4x3,
        alt: 'Image alt text',
      }) ||
      undefined;
    const eyebrow = text('Eyebrow:', 'Industry');
    const heading = text('Heading:', 'Aerospace and defence');
    const copy = text('Body copy:', '');
    const cta = {
      href: 'https://example.com',
      copy: text('CTA:', 'Learn more'),
      icon: {
        src: ArrowRight20,
      },
    };
    const cardStyles = select(
      'Card style:',
      ['Outlined card', 'Inverse card', 'none'],
      'none'
    );
    return {
      image,
      eyebrow,
      heading,
      copy,
      light: cardStyles === 'Outlined card',
      border: cardStyles === 'Outlined card',
      cta,
      inverse: cardStyles === 'Inverse card',
      pictogram: showPictogram && DDS_CARD_WITH_PICTOGRAM ? <Bee /> : null,
    };
  },
  staticProps: () => {
    const image =
      (boolean('Add image:', false) && {
        defaultSrc: imgXlg4x3,
        alt: 'Image alt text',
      }) ||
      undefined;
    const eyebrow = text('Eyebrow:', 'SPSS Statistics');
    const heading = text('Heading:', 'Free trial');
    const copy = text(
      'Body copy:',
      'Enjoy full SPSS Statistics capabilities including all add-ons. All trial registrants are restricted to one free trial per computer per user.'
    );
    const cta = boolean('Add CTA:', false);
    const outlinedCard = boolean('Outlined card:', true);
    return {
      image,
      eyebrow,
      heading,
      copy,
      light: outlinedCard,
      border: outlinedCard,
      cardStatic: outlinedCard,
      cta: cta
        ? {
            href: 'https://example.com',
            copy: text('CTA copy:', 'Sign up for the trial'),
            icon: {
              src: ArrowRight20,
            },
          }
        : '',
    };
  },
};

export default {
  title: 'Components/Card',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';

  return (
    <div className={`bx--card--${theme}`}>
      <div className="bx--grid bx--grid--card">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            <Card {...props.default()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardStatic = () => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';

  return (
    <div className={`bx--card--${theme}`}>
      <div className="bx--grid bx--grid--card">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            <Card {...props.staticProps()} />
          </div>
        </div>
      </div>
    </div>
  );
};

CardStatic.story = {
  name: 'Card static',
  parameters: {
    ...readme.parameters,
  },
};
