/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, object, select } from '@storybook/addon-knobs';
import ContentGroupSimple from '../ContentGroupSimple';
import ContentGroupSimpleKnobs from './data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.stories.mdx';

const types = ContentGroupSimpleKnobs.types;

export default {
  title: 'Patterns (Blocks)|ContentGroupSimple',

  parameters: {
    ...readme.parameters,
    knobs: {
      ContentGroupSimple: ({ groupId }) => {
        const mediaType = select(
          'Media type (mediaType):',
          types,
          types.image,
          groupId
        );
        return {
          mediaType,
          mediaData:
            mediaType === 'image'
              ? ContentGroupSimpleKnobs.mediaData.image
              : ContentGroupSimpleKnobs.mediaData.video,
          heading: text(
            'Heading (heading)',
            ContentGroupSimpleKnobs.heading,
            groupId
          ),
          copy: text('Copy (copy):', ContentGroupSimpleKnobs.copy, groupId),
          items: object(
            'Content Items (items):',
            ContentGroupSimpleKnobs.items,
            groupId
          ),
          cta: object('CTA Data (cta):', ContentGroupSimpleKnobs.cta, groupId),
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
  const { mediaType, mediaData, heading, items, cta, copy } =
    parameters?.props?.ContentGroupSimple ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupSimple
            mediaType={mediaType}
            mediaData={mediaData}
            heading={heading}
            items={items}
            copy={copy}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};
