/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import Bee from '@carbon/pictograms-react/lib/bee';
import { Card } from '../';
import { DDS_CARD_WITH_PICTOGRAM } from '../../../internal/FeatureFlags';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Card',

  parameters: {
    ...readme.parameters,
    knobs: {
      Card: ({ groupId }) => {
        let showPictogram = DDS_CARD_WITH_PICTOGRAM
          ? boolean('Show pictogram (hides CTA)', false, groupId)
          : null;

        let outlinedCard = boolean('Outlined card', false, groupId);
        return {
          image:
            (boolean('image', false, groupId) && {
              defaultSrc: imgLg2x1,
              alt: 'Image alt text',
            }) ||
            undefined,
          eyebrow: text('Card Eyebrow', 'Eyebrow text', groupId),
          heading: text('Card Heading', 'Lorem ipsum dolor sit amet', groupId),
          copy: text('Card body copy', '', groupId),
          light: outlinedCard,
          border: outlinedCard,
          cta: {
            href: 'https://example.com',
            copy: text('CTA copy', 'Card CTA text', groupId),
            icon: {
              src: ArrowRight20,
            },
            iconPlacement: 'right',
          },
          pictogram: showPictogram && DDS_CARD_WITH_PICTOGRAM ? <Bee /> : null,
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';

  return (
    <div className={`bx--card--${theme}`}>
      <div className="bx--grid bx--grid--card">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            <Card {...(parameters?.props?.Card ?? {})} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardStatic = ({ parameters }) => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';

  return (
    <div className={`bx--card--${theme}`}>
      <div className="bx--grid bx--grid--card">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            <Card {...(parameters?.props?.Card ?? {})} />
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
    knobs: {
      Card: ({ groupId }) => {
        let outlinedCard = boolean('Outlined card', true, groupId);
        return {
          image:
            (boolean('image', false, groupId) && {
              defaultSrc: imgLg2x1,
              alt: 'Image alt text',
            }) ||
            undefined,
          eyebrow: text('Card Eyebrow', 'Eyebrow', groupId),
          heading: text('Card Heading', 'Lorem ipsum dolor sit amet', groupId),
          copy: text(
            'Card body copy',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
              'laboris nisi ut aliquip ex ea commodo consequat.',
            groupId
          ),
          light: outlinedCard,
          border: outlinedCard,
          cardStatic: outlinedCard,
          cta: {
            href: 'https://example.com',
            copy: text('CTA copy', 'Card CTA text', groupId),
            icon: {
              src: ArrowRight20,
            },
            iconPlacement: 'right',
          },
        };
      },
    },
  },
};
