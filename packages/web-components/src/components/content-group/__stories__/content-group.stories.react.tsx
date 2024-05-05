/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, optionsKnob } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DContentGroup from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import C4DContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const image = (
  <C4DImage slot="media" alt="Image alt text" default-src={imgLg16x9}>
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9}>
      {' '}
    </C4DImageItem>
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9}>
      {' '}
    </C4DImageItem>
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9}>
      {' '}
    </C4DImageItem>
  </C4DImage>
);

export const Default = (args) => {
  const { heading, copy, showCopy, addChildren, cta } =
    args?.ContentGroup ?? {};
  return (
    <C4DContentGroup>
      <C4DContentGroupHeading>{heading}</C4DContentGroupHeading>
      {showCopy ? <C4DContentGroupCopy>{copy}</C4DContentGroupCopy> : ''}
      {addChildren.includes('Content item simple') ? (
        <C4DContentItem>
          <C4DContentItemHeading>
            Natural language understanding
          </C4DContentItemHeading>
          <C4DContentItemCopy>
            This are of NLP takes "real world" text and applies a symbolic
            system for a machine to interpret its meaning, using formal logic;
            structures that describe the various relationships between concepts
            (ontologies); and other semantic tools.
          </C4DContentItemCopy>
        </C4DContentItem>
      ) : (
        ''
      )}
      {addChildren.includes('Content item with image') ? (
        <C4DContentItem>
          {image}
          <C4DContentItemHeading>
            Natural language understanding
          </C4DContentItemHeading>
          <C4DContentItemCopy>
            This are of NLP takes "real world" text and applies a symbolic
            system for a machine to interpret its meaning, using formal logic;
            structures that describe the various relationships between concepts
            (ontologies); and other semantic tools.
          </C4DContentItemCopy>
          <C4DTextCTA
            slot="footer"
            cta-type="local"
            href="https://www.example.com">
            Read more about NLP
          </C4DTextCTA>
        </C4DContentItem>
      ) : (
        ''
      )}
      {addChildren.includes('Content item with video') ? (
        <C4DContentItem>
          <C4DContentItemHeading>
            Natural language understanding
          </C4DContentItemHeading>
          <C4DVideoPlayerContainer
            slot="media"
            video-id="0_ibuqxqbe"></C4DVideoPlayerContainer>
          <C4DContentItemCopy>
            This are of NLP takes "real world" text and applies a symbolic
            system for a machine to interpret its meaning, using formal logic;
            structures that describe the various relationships between concepts
            (ontologies); and other semantic tools.
          </C4DContentItemCopy>
          <C4DTextCTA
            slot="footer"
            cta-type="local"
            href="https://www.example.com">
            Read more about NLP
          </C4DTextCTA>
        </C4DContentItem>
      ) : (
        ''
      )}
      {cta ? (
        <C4DCardLinkCTA
          slot="footer"
          cta-type="local"
          href="https://www.example.com">
          <C4DCardLinkHeading>
            Learn more about natural language processing
          </C4DCardLinkHeading>
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardLinkCTA>
      ) : (
        ''
      )}
    </C4DContentGroup>
  );
};

export default {
  title: 'Components/Content group',
  decorators: [
    (story) => {
      return (
        <>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-lg-12 cds--no-gutter">
                <C4DVideoCTAContainer>{story()}</C4DVideoCTAContainer>
              </div>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroup: () => ({
        heading: textNullable('Heading:', 'Natural language processing (NLP)'),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et ' +
          'magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula,' +
          ' vitae finibus ante aliquet a.',
        addChildren: optionsKnob(
          'Add children:',
          {
            'Content item simple': 'Content item simple',
            'Content item with image': 'Content item with image',
            'Content item with video': 'Content item with video',
          },
          '',
          { display: 'multi-select' }
        ),
        cta: boolean('CTA:', true),
      }),
    },
    propsSet: {
      default: {
        ContentGroup: {
          heading: 'Natural language processing (NLP)',
          showCopy: 'Copy:',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
            ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et ' +
            'magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula,' +
            ' vitae finibus ante aliquet a.',
          addChildren: '',
          cta: true,
        },
      },
    },
  },
};
