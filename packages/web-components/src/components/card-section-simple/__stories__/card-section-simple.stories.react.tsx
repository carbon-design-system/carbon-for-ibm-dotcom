/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { text, boolean } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSCardSectionSimple from '@carbon/ibmdotcom-web-components/es/components-react/card-section-simple/card-section-simple';
/* eslint-disable max-len */
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';

import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--005.jpg';

import readme from './README.stories.react.mdx';

const cardGroupItems = withImages => {
  return (
    <DDSCardGroupItem href="https://example.com" cta-type="local">
      {withImages ? <DDSImage slot="image" alt="Image alt text" default-src={imgLg4x3} /> : ''}
      <DDSCardEyebrow>Topic</DDSCardEyebrow>
      <DDSCardHeading>Natural Language Processing.</DDSCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
        Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <DDSCardCTAFooter slot="footer"></DDSCardCTAFooter>
    </DDSCardGroupItem>
  );
};

export const Default = args => {
  const { heading, withImages, withCTA } = args?.CardSectionSimple ?? {};
  const cards: object[] = [];
  for (let i = 0; i < 5; i++) {
    cards.push(cardGroupItems(withImages));
  }
  return (
    <DDSCardSectionSimple>
      <DDSContentSectionHeading>{heading || null}</DDSContentSectionHeading>
      <DDSCardGroup>
        {cards}
        {withCTA ? (
          <DDSCardGroupItem href="https://example.com" color-scheme="inverse" cta-type="local">
            <DDSCardHeading>Top level card link</DDSCardHeading>
            <DDSCardCTAFooter slot="footer" color-scheme="inverse"></DDSCardCTAFooter>
          </DDSCardGroupItem>
        ) : (
          ''
        )}
      </DDSCardGroup>
    </DDSCardSectionSimple>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CardSectionSimple: () => ({
        heading: text('Heading (required):', 'Aliquam condimentum interdum'),
        withImages: boolean('With images:', false),
        withCTA: boolean('With CTA:', false),
      }),
    },
  },
};

export default {
  title: 'Components/Card section simple',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">{story()}</div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
