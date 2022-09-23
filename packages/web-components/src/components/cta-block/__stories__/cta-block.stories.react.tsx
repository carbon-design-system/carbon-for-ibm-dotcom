/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, select, number } from '@storybook/addon-knobs';
import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Launch20 from '@carbon/icons-react/es/launch/20.js';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import DDSCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import DDSTabsExtended from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tabs-extended';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import DDSTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';

import content from '../../cta-section/__stories__/content';

import readme from './README.stories.react.mdx';
import styles from './cta-block.stories.scss';

const iconMap = {
  ArrowRight20: <ArrowRight20 slot="icon" />,
  Launch20: <Launch20 slot="icon" />,
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'External Launch': 'Launch20',
};

const contentItemTypeMap = {
  text: ({ heading, copy, links }) => (
    <DDSCTABlockItem>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemCopy>{copy}</DDSContentItemCopy>
      {links.map(elem => (
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href={elem.href}>
          {elem.copy}
        </DDSTextCTA>
      ))}
    </DDSCTABlockItem>
  ),
  button: ({ heading, copy }) => (
    <DDSCTABlockItem>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemCopy>{copy}</DDSContentItemCopy>
      <DDSButtonGroup slot="footer">
        <DDSButtonCTA cta-type="local">Button 1</DDSButtonCTA>
        <DDSButtonCTA cta-type="local">Button 2</DDSButtonCTA>
      </DDSButtonGroup>
    </DDSCTABlockItem>
  ),
};

const contentItemTypeOptions = {
  Text: 'text',
  Button: 'button',
};

const renderItems = (item, count) => (
  <DDSCTABlockItemRow no-border>{count.map((_, index) => item({ ...content[index] }))}</DDSCTABlockItemRow>
);

export const Default = args => {
  const { heading, border, copy, renderIcon } = args?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return (
    <DDSCTABlock no-border={!border}>
      <DDSContentBlockHeading>{heading || null}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
      <DDSButtonGroup slot="action">
        <DDSButtonGroupItem target={target} href="https://example.com">
          Secondary Button {renderIcon}
        </DDSButtonGroupItem>
        <DDSButtonGroupItem target={target} href="https://example.com">
          Primary Button {renderIcon}
        </DDSButtonGroupItem>
      </DDSButtonGroup>
    </DDSCTABlock>
  );
};

export const WithContentItems = args => {
  const { heading, border, copy, renderIcon } = args?.CTABlock ?? {};
  const { contentItemType, contentItemCount } = args?.WithContentItems ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return (
    <DDSCTABlock no-border={!border}>
      <DDSContentBlockHeading>{heading || null}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{copy || null}</DDSContentBlockCopy>

      <DDSButtonGroup slot="action">
        <DDSButtonGroupItem target={target} href="https://example.com">
          Secondary Button {renderIcon}
        </DDSButtonGroupItem>
        <DDSButtonGroupItem target={target} href="https://example.com">
          Primary Button {renderIcon}
        </DDSButtonGroupItem>
      </DDSButtonGroup>

      {renderItems(contentItemType, contentItemCount)}
    </DDSCTABlock>
  );
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    knobs: {
      WithContentItems: () => ({
        contentItemType:
          contentItemTypeMap[select(`Content item type`, contentItemTypeOptions, contentItemTypeOptions.Text) ?? 0],
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }),
        }),
      }),
    },
  },
};

export const WithLinkList = args => {
  const { heading, copy, renderIcon } = args?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return (
    <DDSCTABlock>
      <DDSContentBlockHeading>{heading || null}</DDSContentBlockHeading>
      <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
      <DDSButtonGroup slot="action">
        <DDSButtonGroupItem target={target} href="https://example.com">
          Secondary Button {renderIcon}
        </DDSButtonGroupItem>
        <DDSButtonGroupItem target={target} href="https://example.com">
          Primary Button {renderIcon}
        </DDSButtonGroupItem>
      </DDSButtonGroup>

      <DDSLinkList slot="link-list" type="end">
        <DDSLinkListHeading>More ways to explore DevOps</DDSLinkListHeading>
        <DDSLinkListItem href="https://example.com">
          Events <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Blogs <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Training <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Developer resources <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          Research <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
        <DDSLinkListItem href="https://example.com">
          News <ArrowRight20 slot="icon" />
        </DDSLinkListItem>
      </DDSLinkList>
    </DDSCTABlock>
  );
};

WithLinkList.story = {
  name: 'With link list',
};

export const WithinTabs = args => {
  const { contentItemType, contentItemCount } = args?.WithinTabs ?? {};

  return (
    <DDSTabsExtended orientation="horizontal">
      <DDSTab label="Tab 1" selected>
        <DDSCTABlock>
          <DDSContentBlockHeading>Tab 1</DDSContentBlockHeading>
          {renderItems(contentItemType, contentItemCount)}
        </DDSCTABlock>
      </DDSTab>
      <DDSTab label="Tab 2">
        <DDSCTABlock>
          <DDSContentBlockHeading>Tab 2</DDSContentBlockHeading>
          {renderItems(contentItemType, contentItemCount)}
        </DDSCTABlock>
      </DDSTab>
      <DDSTab label="Tab 3">
        <DDSCTABlock>
          <DDSContentBlockHeading>Tab 3</DDSContentBlockHeading>
          {renderItems(contentItemType, contentItemCount)}
        </DDSCTABlock>
      </DDSTab>
    </DDSTabsExtended>
  );
};

WithinTabs.story = {
  name: 'Within tabs',
  parameters: {
    knobs: {
      WithinTabs: () => ({
        contentItemType:
          contentItemTypeMap[select(`Content item type`, contentItemTypeOptions, contentItemTypeOptions.Text) ?? 0],
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }),
        }),
      }),
    },
  },
};

export default {
  title: 'Components/CTA block',
  decorators: [
    story => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-12 bx--no-gutter">{story()}</div>
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
      CTABlock: () => ({
        heading: text('Heading (required)', 'Take the next step'),
        border: boolean('Border', false),
        copy: 'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
        renderIcon: iconMap[select(`Icon`, iconOptions, iconOptions.Default) ?? 0],
      }),
    },
  },
};
