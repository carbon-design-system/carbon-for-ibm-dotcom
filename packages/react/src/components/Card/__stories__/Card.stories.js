/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Card',

  parameters: {
    ...readme.parameters,
    knobs: {
      Card: ({ groupId }) => ({
        image:
          (boolean('image', false, groupId) && {
            defaultSrc: 'https://dummyimage.com/600x300/ee5396/161616&text=2:1',
            alt: 'Image alt text',
          }) ||
          undefined,
        eyebrow: text('eyebrow', 'eyebrow text', groupId),
        heading: text(
          'title (required)',
          'Lorem ipsum dolor sit amet',
          groupId
        ),
        copy: text('copy', '', groupId),
        inverse: boolean('inverse', false, groupId),
        cta: {
          href: text('Cta href (cta.href)', 'https://example.com', groupId),
          copy: text('Cta copy (cta.copy)', 'Card cta text', groupId),
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
      }),
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
