/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select } from '@storybook/addon-knobs';
import ContentGroupSimple from '../ContentGroupSimple';
import ContentGroupSimpleKnobs from './data/ContentGroupSimple.knobs.js';
import React from 'react';
import readme from '../README.stories.mdx';

const types = {
  None: null,
  Image: 'image',
  Video: 'video',
};

const props = () => ({
  heading: text('Heading (heading)', ContentGroupSimpleKnobs.heading),
  copy: text('Copy (copy):', ContentGroupSimpleKnobs.copy),
  items: ContentGroupSimpleKnobs.items,
  cta: ContentGroupSimpleKnobs.cta,
  mediaType: select('With media:', types, types.Image),
});

export default {
  title: 'Components/Content group simple',
  parameters: {
    ...readme.parameters,
    propsSet: {
      default: {
        ContentGroupSimple: {
          items: ContentGroupSimpleKnobs.items,
        },
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          {props().mediaType === null ? (
            <ContentGroupSimple {...props()} />
          ) : (
            ''
          )}
          {props().mediaType === 'image' ? (
            <ContentGroupSimple
              mediaData={ContentGroupSimpleKnobs.mediaData.image}
              {...props()}
            />
          ) : (
            ''
          )}
          {props().mediaType === 'video' ? (
            <ContentGroupSimple
              mediaData={ContentGroupSimpleKnobs.mediaData.video}
              {...props()}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
