/**
 * Copyright IBM Corp. 2016, 2021
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
  Image: 'Image',
  Video: 'Video',
};

export default {
  title: 'Components|Content group simple',
  parameters: {
    ...readme.parameters,
    knobs: {
      ContentGroupSimple: ({ groupId }) => {
        return {
          heading: text(
            'Heading (heading)',
            ContentGroupSimpleKnobs.heading,
            groupId
          ),
          copy: text('Copy (copy):', ContentGroupSimpleKnobs.copy, groupId),
          items: ContentGroupSimpleKnobs.items,
          cta: ContentGroupSimpleKnobs.cta,
          mediaType: select('With media:', types, types.Image, groupId),
        };
      },
    },
    propsSet: {
      default: {
        ContentGroupSimple: {
          items: ContentGroupSimpleKnobs.items,
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, items, cta, copy, mediaType } =
    parameters?.props?.ContentGroupSimple ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          {mediaType === null ? (
            <ContentGroupSimple
              heading={heading}
              items={items}
              copy={copy}
              cta={cta}
            />
          ) : (
            ''
          )}
          {mediaType === 'Image' ? (
            <ContentGroupSimple
              mediaType="image"
              mediaData={ContentGroupSimpleKnobs.mediaData.image}
              heading={heading}
              items={items}
              copy={copy}
              cta={cta}
            />
          ) : (
            ''
          )}
          {mediaType === 'Video' ? (
            <ContentGroupSimple
              mediaType="video"
              mediaData={ContentGroupSimpleKnobs.mediaData.video}
              heading={heading}
              items={items}
              copy={copy}
              cta={cta}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
