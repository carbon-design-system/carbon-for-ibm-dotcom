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
        let outlinedCard = boolean('Outlined card:', false, groupId);
        return {
          image:
            (boolean('Add image:', false, groupId) && {
              defaultSrc: imgLg2x1,
              alt: 'Image alt text',
            }) ||
            undefined,
          eyebrow: text('Eyebrow:', 'Industry', groupId),
          heading: text('Heading:', 'Aerospace and defence', groupId),
          copy: text('Body copy:', '', groupId),
          light: outlinedCard,
          border: outlinedCard,
          cta: {
            href: 'https://example.com',
            copy: text('CTA:', 'Learn more', groupId),
            icon: {
              src: ArrowRight20,
            },
          },
          pictogram: showPictogram && DDS_CARD_WITH_PICTOGRAM ? <Bee /> : null,
          inverse: boolean('Inverse card:', false, groupId),
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
        let outlinedCard = boolean('Outlined card:', true, groupId);
        let cta = boolean('Add CTA:', false, groupId);
        return {
          image:
            (boolean('Add image:', false, groupId) && {
              defaultSrc: imgLg2x1,
              alt: 'Image alt text',
            }) ||
            undefined,
          eyebrow: text('Eyebrow:', 'SPSS Statistics', groupId),
          heading: text('Heading:', 'Free trial', groupId),
          copy: text(
            'Body copy:',
            'Enjoy full SPSS Statistics capabilities including all add-ons. All trial registrants are restricted to one free trial per computer per user.',
            groupId
          ),
          light: outlinedCard,
          border: outlinedCard,
          cardStatic: outlinedCard,
          cta: cta
            ? {
                href: 'https://example.com',
                copy: 'Sign up for the trial',
                icon: {
                  src: ArrowRight20,
                },
              }
            : '',
        };
      },
    },
  },
};
