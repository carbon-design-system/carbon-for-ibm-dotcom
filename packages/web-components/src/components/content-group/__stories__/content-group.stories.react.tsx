/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, optionsKnob } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardLinkCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-link-cta';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSContentGroup from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentGroupCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-copy';
import DDSContentItem from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import DDSVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';

import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';

import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const image = (
  <DDSImage slot="media" alt="Image alt text" default-src={imgLg16x9} heading="Lorem ipsum dolor sit amet.">
    <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9}>
      {' '}
    </DDSImageItem>
    <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9}>
      {' '}
    </DDSImageItem>
    <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9}>
      {' '}
    </DDSImageItem>
  </DDSImage>
);

export const Default = args => {
  const { heading, copy, showCopy, addChildren, cta } = args?.ContentGroup ?? {};
  return (
    <DDSContentGroup>
      <DDSContentGroupHeading>{heading}</DDSContentGroupHeading>
      {showCopy ? <DDSContentGroupCopy>{copy}</DDSContentGroupCopy> : ''}
      {addChildren.includes('Content item simple') ? (
        <DDSContentItem>
          <DDSContentItemHeading>Natural language understanding</DDSContentItemHeading>
          <DDSContentItemCopy>
            This are of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using
            formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic
            tools.
          </DDSContentItemCopy>
        </DDSContentItem>
      ) : (
        ''
      )}
      {addChildren.includes('Content item with image') ? (
        <DDSContentItem>
          {image}
          <DDSContentItemHeading>Natural language understanding</DDSContentItemHeading>
          <DDSContentItemCopy>
            This are of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using
            formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic
            tools.
          </DDSContentItemCopy>
          <DDSTextCTA slot="footer" cta-type="local" href="https://www.example.com">
            Read more about NLP
          </DDSTextCTA>
        </DDSContentItem>
      ) : (
        ''
      )}
      {addChildren.includes('Content item with video') ? (
        <DDSContentItem>
          <DDSContentItemHeading>Natural language understanding</DDSContentItemHeading>
          <DDSVideoPlayerContainer slot="media" video-id="1_9h94wo6b"></DDSVideoPlayerContainer>
          <DDSContentItemCopy>
            This are of NLP takes "real world" text and applies a symbolic system for a machine to interpret its meaning, using
            formal logic; structures that describe the various relationships between concepts (ontologies); and other semantic
            tools.
          </DDSContentItemCopy>
          <DDSTextCTA slot="footer" cta-type="local" href="https://www.example.com">
            Read more about NLP
          </DDSTextCTA>
        </DDSContentItem>
      ) : (
        ''
      )}
      {cta ? (
        <DDSCardLinkCTA slot="footer" cta-type="local" href="https://www.example.com">
          <DDSCardLinkHeading>Learn more about natural language processing</DDSCardLinkHeading>
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardLinkCTA>
      ) : (
        ''
      )}
    </DDSContentGroup>
  );
};

export default {
  title: 'Components/Content group',
  decorators: [
    story => {
      return (
        <>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-12 bx--no-gutter">
                <DDSVideoCTAContainer>{story()}</DDSVideoCTAContainer>
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
