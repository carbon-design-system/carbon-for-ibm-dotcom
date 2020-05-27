/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, object, withKnobs, select } from '@storybook/addon-knobs';
import ContentGroupSimple from '../ContentGroupSimple';
import ContentGroupSimpleKnobs from './data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|ContentGroupSimple',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const heading = text('Heading', ContentGroupSimpleKnobs.heading);
  const types = ContentGroupSimpleKnobs.types;
  const mediaType = select('Media type:', types, types.image);
  const mediaData =
    mediaType === 'image'
      ? ContentGroupSimpleKnobs.mediaData.image
      : ContentGroupSimpleKnobs.mediaData.video;
  const items = object('Content Items:', ContentGroupSimpleKnobs.items);
  const cta = object('CTA Data:', ContentGroupSimpleKnobs.cta);

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupSimple
            mediaType={mediaType}
            mediaData={mediaData}
            heading={heading}
            items={items}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};
