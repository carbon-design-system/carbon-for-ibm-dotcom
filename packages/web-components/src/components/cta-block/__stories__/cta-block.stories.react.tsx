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
import { ArrowRight, Launch } from '@carbon/icons-react';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import C4DCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import C4DCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import C4DTabsExtended from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tabs-extended';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DTab from '@carbon/ibmdotcom-web-components/es/components-react/tabs-extended/tab';

import content from '../../cta-section/__stories__/content';

import readme from './README.stories.react.mdx';
import styles from './cta-block.stories.scss';

const iconMap = {
  ArrowRight: <ArrowRight size="20" slot="icon" />,
  Launch: <Launch size="20" slot="icon" />,
};

const iconOptions = {
  'Arrow Right': 'ArrowRight',
  'External Launch': 'Launch',
};

const renderCTA = {
  text: (renderIcon) => (
    <C4DTextCTA
      slot="action"
      cta-type={renderIcon === iconMap.Launch ? 'external' : 'local'}
      href="https://example.com">
      CTA text link
    </C4DTextCTA>
  ),
  button: (renderIcon) => (
    <C4DButtonCTA
      slot="action"
      cta-type={renderIcon === iconMap.Launch ? 'external' : 'local'}
      href="https://example.com">
      CTA text link
    </C4DButtonCTA>
  ),
  buttonGroup: (renderIcon, target) => (
    <C4DButtonGroup slot="action">
      <C4DButtonGroupItem target={target} href="https://example.com">
        Secondary Button {renderIcon}
      </C4DButtonGroupItem>
      <C4DButtonGroupItem target={target} href="https://example.com">
        Primary Button {renderIcon}
      </C4DButtonGroupItem>
    </C4DButtonGroup>
  ),
};

const ctaTypeOptions = {
  Text: 'text',
  Button: 'button',
  'Button group': 'buttonGroup',
};

const contentItemTextCTA = ({ heading, copy, links }) => (
  <C4DCTABlockItem>
    <C4DContentItemHeading>{heading}</C4DContentItemHeading>
    <C4DContentItemCopy>{copy}</C4DContentItemCopy>
    {links.map((elem) => (
      <C4DTextCTA
        slot="footer"
        cta-type="local"
        icon-placement="right"
        href={elem.href}>
        {elem.copy}
      </C4DTextCTA>
    ))}
  </C4DCTABlockItem>
);

const renderItems = (item, count) => (
  <C4DCTABlockItemRow no-border>
    {count.map((_, index) => item({ ...content[index] }))}
  </C4DCTABlockItemRow>
);

export const Default = (args) => {
  const { heading, border, copy, renderIcon, cta } = args?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch ? '_blank' : '';

  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent!.shadowRoot!.innerHTML = heading;
  }

  return (
    <C4DCTABlock no-border={!border || null}>
      <C4DContentBlockHeading>{heading || null}</C4DContentBlockHeading>
      <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
      {renderCTA[cta](renderIcon, target)}
    </C4DCTABlock>
  );
};

export const WithContentItems = (args) => {
  const { heading, border, copy, renderIcon, cta } = args?.CTABlock ?? {};
  const { contentItemType, contentItemCount } = args?.WithContentItems ?? {};
  const target = renderIcon === iconMap.Launch ? '_blank' : '';

  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent!.shadowRoot!.innerHTML = heading;
  }

  return (
    <C4DCTABlock no-border={!border || null}>
      <C4DContentBlockHeading>{heading || null}</C4DContentBlockHeading>
      <C4DContentBlockCopy>{copy || null}</C4DContentBlockCopy>
      {renderCTA[cta](renderIcon, target)}
      {renderItems(contentItemType, contentItemCount)}
    </C4DCTABlock>
  );
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    knobs: {
      WithContentItems: () => ({
        contentItemType: contentItemTextCTA,
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }),
        }),
      }),
    },
  },
};

export const WithLinkList = (args) => {
  const { border, heading, copy, renderIcon, cta } = args?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch ? '_blank' : '';

  const headingComponent = document.querySelector('cds-content-block-heading');

  if (headingComponent) {
    headingComponent!.shadowRoot!.innerHTML = heading;
  }

  return (
    <C4DCTABlock no-border={!border || null}>
      <C4DContentBlockHeading>{heading || null}</C4DContentBlockHeading>
      <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
      {renderCTA[cta](renderIcon, target)}

      <C4DLinkList slot="link-list" type="end">
        <C4DLinkListHeading>More ways to explore DevOps</C4DLinkListHeading>
        <C4DLinkListItem href="https://example.com">
          Events <ArrowRight size="20" slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          Blogs <ArrowRight size="20" slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          Training <ArrowRight size="20" slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          Developer resources <ArrowRight size="20" slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          Research <ArrowRight size="20" slot="icon" />
        </C4DLinkListItem>
        <C4DLinkListItem href="https://example.com">
          News <ArrowRight size="20" slot="icon" />
        </C4DLinkListItem>
      </C4DLinkList>
    </C4DCTABlock>
  );
};

WithLinkList.story = {
  name: 'With link list',
};

export const WithinTabs = (args) => {
  const { contentItemType, contentItemCount } = args?.WithinTabs ?? {};

  return (
    <C4DTabsExtended orientation="horizontal">
      <C4DTab label="Tab 1" selected>
        <C4DCTABlock>
          <C4DContentBlockHeading>Tab 1</C4DContentBlockHeading>
          {renderItems(contentItemType, contentItemCount)}
        </C4DCTABlock>
      </C4DTab>
      <C4DTab label="Tab 2">
        <C4DCTABlock>
          <C4DContentBlockHeading>Tab 2</C4DContentBlockHeading>
          {renderItems(contentItemType, contentItemCount)}
        </C4DCTABlock>
      </C4DTab>
      <C4DTab label="Tab 3">
        <C4DCTABlock>
          <C4DContentBlockHeading>Tab 3</C4DContentBlockHeading>
          {renderItems(contentItemType, contentItemCount)}
        </C4DCTABlock>
      </C4DTab>
    </C4DTabsExtended>
  );
};

WithinTabs.story = {
  name: 'Within tabs',
  parameters: {
    knobs: {
      CTABlock: () => ({}),
      WithinTabs: () => ({
        contentItemType: contentItemTextCTA,
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
    (story) => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-lg-12 cds--no-gutter">{story()}</div>
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
        cta: select('CTA type', ctaTypeOptions, ctaTypeOptions['Button group']),
        renderIcon:
          iconMap[select(`Icon`, iconOptions, iconOptions['Arrow Right']) ?? 0],
      }),
    },
  },
};
