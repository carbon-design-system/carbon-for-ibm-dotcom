/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, select } from '@storybook/addon-knobs';
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
        return {
          image:
            (boolean('image', false, groupId) && {
              defaultSrc: imgLg2x1,
              alt: 'Image alt text',
            }) ||
            undefined,
          eyebrow: text('eyebrow', 'Eyebrow text', groupId),
          heading: text(
            'title (required)',
            'Lorem ipsum dolor sit amet',
            groupId
          ),
          copy: text('copy', '', groupId),
          inverse: boolean('inverse', false, groupId),
          cta: {
            href: text('Cta href (cta.href)', 'https://example.com', groupId),
            copy: text('Cta copy (cta.copy)', 'Card CTA text', groupId),
            icon: {
              src: ArrowRight20,
            },
            iconPlacement: select(
              'Cta icon placement (cta.iconPlacement)',
              ['left', 'right'],
              'right',
              groupId
            ),
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
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            <Card {...(parameters?.props?.Card ?? {})} />
          </div>
        </div>
      </div>
    </div>
  );
};
