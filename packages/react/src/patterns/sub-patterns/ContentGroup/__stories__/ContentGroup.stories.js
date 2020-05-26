/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import ContentGroup from '../ContentGroup';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Sub-Patterns)|ContentGroup',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const heading = text(
    'Component heading(required):',
    'Lorem ipsum dolor sit amet.'
  );
  const renderCTA = boolean('render CTA', true);
  const cta = {
    copy: renderCTA && text('CTA heading', 'Lorem ipsum dolor sit amet'),
    cta: {
      href: renderCTA && text('CTA href', 'https://www.example.com'),
    },
  };

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <ContentGroup heading={heading} cta={renderCTA ? cta : null}>
            This is the Content Group children.
          </ContentGroup>
        </div>
      </div>
    </div>
  );
};
