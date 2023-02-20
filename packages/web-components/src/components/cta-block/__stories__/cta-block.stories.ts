/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import Launch20 from 'carbon-web-components/es/icons/launch/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import styles from './cta-block.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../tabs-extended/index';
import '../index';
import '../../link-list/index';

import content from '../../cta-section/__stories__/content';

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  Launch20: Launch20({ slot: 'icon' }),
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'External Launch': 'Launch20',
};

const contentItemTypeMap = {
  text: ({ heading, copy, links }) => html`
    <dds-cta-block-item>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      ${links.map(
        elem =>
          html`
            <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="${elem.href}">${elem.copy}</dds-text-cta>
          `
      )}
    </dds-cta-block-item>
  `,
  button: ({ heading, copy }) => html`
    <dds-cta-block-item>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      <dds-button-group slot="footer">
        <dds-button-cta cta-type="local">Button 1</dds-button-cta>
        <dds-button-cta cta-type="local">Button 2</dds-button-cta>
      </dds-button-group>
    </dds-cta-block-item>
  `,
};

const contentItemTypeOptions = {
  Text: 'text',
  Button: 'button',
};

const renderItems = (item, count) => {
  return html`
    <dds-cta-block-item-row no-border>
      ${count.map((_, index) => item({ ...content[index] }))}
    </dds-cta-block-item-row>
  `;
};

export const Default = ({ parameters }) => {
  const { heading, border, copy, renderIcon } = parameters?.props?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-block ?no-border=${!border}>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-content-block-copy>${copy}</dds-content-block-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>
    </dds-cta-block>
  `;
};

export const WithContentItems = ({ parameters }) => {
  const { heading, border, copy, renderIcon } = parameters?.props?.CTABlock ?? {};
  const { contentItemType, contentItemCount } = parameters?.props?.WithContentItems ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-block ?no-border=${!border}>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-content-block-copy>${ifNonNull(copy)}</dds-content-block-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>
      ${renderItems(contentItemType, contentItemCount)}
    </dds-cta-block>
  `;
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    knobs: {
      WithContentItems: ({ groupId }) => ({
        contentItemType:
          contentItemTypeMap[select(`Content item type`, contentItemTypeOptions, contentItemTypeOptions.Text, groupId) ?? 0],
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }, groupId),
        }),
      }),
    },
    propsSet: {
      default: {
        WithContentItems: {
          contentItemType: contentItemTypeMap[contentItemTypeOptions.Text],
          contentItemCount: Array(3),
        },
      },
    },
  },
};

export const WithLinkList = ({ parameters }) => {
  const { heading, copy, renderIcon } = parameters?.props?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  return html`
    <dds-cta-block>
      <dds-content-block-heading>${ifNonNull(heading)}</dds-content-block-heading>
      <dds-content-block-copy>${ifNonNull(copy)}</dds-content-block-copy>

      <dds-button-group slot="action">
        <dds-button-group-item target="${target}" href="https://example.com">
          Secondary Button ${renderIcon}
        </dds-button-group-item>
        <dds-button-group-item target="${target}" href="https://example.com">
          Primary button ${renderIcon}
        </dds-button-group-item>
      </dds-button-group>

      <dds-link-list slot="link-list" type="end">
        <dds-link-list-heading>More ways to explore DevOps</dds-link-list-heading>
        <dds-link-list-item href="https://example.com">
          Events ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Blogs ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Training ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Developer resources ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          Research ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
        <dds-link-list-item href="https://example.com">
          News ${ArrowRight20({ slot: 'icon' })}
        </dds-link-list-item>
      </dds-link-list>
    </dds-cta-block>
  `;
};

WithLinkList.story = {
  name: 'With link list',
};

export const WithinTabs = ({ parameters }) => {
  const { contentItemType, contentItemCount } = parameters?.props?.WithinTabs ?? {};

  return html`
    <dds-tabs-extended orientation="horizontal">
      <dds-tab label="Tab 1" selected>
        <dds-cta-block>
          <dds-content-block-heading>Tab 1</dds-content-block-heading>
          ${renderItems(contentItemType, contentItemCount)}
        </dds-cta-block>
      </dds-tab>
      <dds-tab label="Tab 2">
        <dds-cta-block>
          <dds-content-block-heading>Tab 2</dds-content-block-heading>
          ${renderItems(contentItemType, contentItemCount)}
        </dds-cta-block>
      </dds-tab>
      <dds-tab label="Tab 3">
        <dds-cta-block>
          <dds-content-block-heading>Tab 3</dds-content-block-heading>
          ${renderItems(contentItemType, contentItemCount)}
        </dds-cta-block>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

WithinTabs.story = {
  name: 'Within tabs',
  parameters: {
    knobs: {
      WithinTabs: ({ groupId }) => ({
        contentItemType:
          contentItemTypeMap[select(`Content item type`, contentItemTypeOptions, contentItemTypeOptions.Text, groupId) ?? 0],
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }, groupId),
        }),
      }),
    },
    propsSet: {
      default: {
        WithinTabs: {
          contentItemType: contentItemTypeMap[contentItemTypeOptions.Text],
          contentItemCount: Array(3),
        },
      },
    },
  },
};

export default {
  title: 'Components/CTA block',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    knobs: {
      CTABlock: ({ groupId }) => ({
        heading: textNullable('Heading (required)', 'Take the next step', groupId),
        border: boolean('Border', false, groupId),
        copy: 'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
        renderIcon: iconMap[select(`Icon`, iconOptions, iconOptions.Default, groupId) ?? 0],
      }),
    },
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        CTABlock: {
          heading: 'Take the next step',
          border: false,
          copy: 'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
          renderIcon: iconOptions.Default,
        },
      },
    },
  },
};
