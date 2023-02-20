/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { boolean, text } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import CardLink from '../CardLink';
import Error20 from '@carbon/icons-react/es/error/20';
import React from 'react';
import readme from '../README.stories.mdx';

const getBaseKnobs = ({ groupId }) => {
  const disabled = boolean('Disabled (disabled):', false, groupId);
  const iconStyle = disabled ? Error20 : ArrowRight20;
  return {
    card: {
      heading: text(
        'Card Heading (card.heading):',
        'Explore AI use cases in all industries',
        groupId
      ),
      cta: {
        href: text(
          'Card href (card.cta.href):',
          'https://www.example.com',
          groupId
        ),
        icon: {
          src: iconStyle,
        },
      },
      disabled: disabled,
    },
  };
};

export default {
  title: 'Components|Card link',
  parameters: {
    ...readme.parameters,
    knobs: {
      CardLink: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });
        return {
          ...knobs,
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { card, disabled } = parameters?.props?.CardLink ?? {};

  return (
    <div className="bx--grid bx--grid--card bx--grid--condensed">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
          <CardLink card={card} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};
