/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, optionsKnob } from '@storybook/addon-knobs';
import ContentBlock from '../ContentBlock';
import ContentGroupCards from '../../ContentGroupCards/ContentGroupCards';
import ContentGroupCardsKnobs from '../../ContentGroupCards/__stories__/data/ContentGroupCards.knobs';
import ContentGroupSimple from '../../ContentGroupSimple/ContentGroupSimple';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Content block',
  parameters: {
    ...readme.parameters,
    knobs: {
      ContentBlock: () => {
        return {
          heading: text(
            'Heading:',
            'What is the latest news in artificial intelligence?'
          ),
          copy: text(
            'Copy:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at, molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula, vitae finibus ante aliquet a.'
          ),
          addChildren: optionsKnob(
            'Add children:',
            {
              'Content group simple': 'Content group simple',
              'Content group cards': 'Content group cards',
            },
            '',
            { display: 'multi-select' }
          ),
          showCTA: boolean('CTA:', true),
          cta: {
            cta: {
              href: 'https://www.example.com',
            },
            style: 'card',
            type: 'local',
            heading: 'Learn more about natual language processing',
          },
          border: boolean('Border: ', false),
          items: ContentGroupCardsKnobs.items,
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, cta, copy, addChildren, showCTA, border, items } =
    parameters?.props?.ContentBlock ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4 content-block-story">
          <ContentBlock
            heading={heading}
            copy={copy}
            children={[
              addChildren.includes('Content group simple') ? (
                <ContentGroupSimple
                  mediaType="image"
                  mediaData={ContentGroupSimpleKnobs.mediaData.image}
                  heading="Natural language processing (NLP)"
                  items={ContentGroupSimpleKnobs.items}
                  copy={ContentGroupSimpleKnobs.copy}
                  cta={ContentGroupSimpleKnobs.cta}
                />
              ) : (
                ``
              ),
              addChildren.includes('Content group cards') ? (
                <ContentGroupCards heading="Machine learning" items={items} />
              ) : (
                ``
              ),
            ]}
            cta={showCTA ? cta : ''}
            border={border}
          />
        </div>
      </div>
    </div>
  );
};
