/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { text, boolean } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DCardSectionSimple from '@carbon/ibmdotcom-web-components/es/components-react/card-section-simple/card-section-simple';
/* eslint-disable max-len */
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';

import imgLg4x3 from '../../../../.storybook/storybook-images/assets/720/fpo--4x3--720x540--005.jpg';

import readme from './README.stories.react.mdx';

const cardGroupItems = (withImages) => {
  return (
    <C4DCardGroupItem href="https://example.com" cta-type="local">
      {withImages ? (
        <C4DImage slot="image" alt="Image alt text" default-src={imgLg4x3} />
      ) : (
        ''
      )}
      <C4DCardEyebrow>Topic</C4DCardEyebrow>
      <C4DCardHeading>Natural Language Processing.</C4DCardHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </p>
      <C4DCardCTAFooter slot="footer"></C4DCardCTAFooter>
    </C4DCardGroupItem>
  );
};

export const Default = (args) => {
  const { heading, withImages, withCTA } = args?.CardSectionSimple ?? {};
  const cards: object[] = [];
  for (let i = 0; i < 5; i++) {
    cards.push(cardGroupItems(withImages));
  }
  return (
    <C4DCardSectionSimple>
      <C4DContentSectionHeading>{heading || null}</C4DContentSectionHeading>
      <C4DCardGroup>
        {cards}
        {withCTA ? (
          <C4DCardGroupItem
            href="https://example.com"
            color-scheme="inverse"
            cta-type="local">
            <C4DCardHeading>Top level card link</C4DCardHeading>
            <C4DCardCTAFooter
              slot="footer"
              color-scheme="inverse"></C4DCardCTAFooter>
          </C4DCardGroupItem>
        ) : (
          ''
        )}
      </C4DCardGroup>
    </C4DCardSectionSimple>
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
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">{story()}</div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
