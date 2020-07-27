/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentGroupSimple from '../ContentGroupSimple';
import ContentGroupSimpleKnobs from './data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|ContentGroupSimple',

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
  const { heading, items, cta, copy } =
    parameters?.props?.ContentGroupSimple ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupSimple
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

export const WithImage = ({ parameters }) => {
  const { heading, items, cta, copy } =
    parameters?.props?.ContentGroupSimple ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupSimple
            mediaType="image"
            mediaData={ContentGroupSimpleKnobs.mediaData.image}
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

export const WithVideo = ({ parameters }) => {
  const { heading, items, cta, copy } =
    parameters?.props?.ContentGroupSimple ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentGroupSimple
            mediaType="video"
            mediaData={ContentGroupSimpleKnobs.mediaData.video}
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

WithVideo.story = {
  parameters: {
    percy: {
      skip: true,
    },
  },
};
