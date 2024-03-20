/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, select } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import Launch20 from '../../../internal/vendor/@carbon/web-components/icons/launch/20';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
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
  'Arrow Right': 'ArrowRight20',
  'External Launch': 'Launch20',
};

const renderCTA = {
  text: (renderIcon) => html`
    <c4d-text-cta
      slot="action"
      cta-type=${renderIcon === iconMap.Launch20 ? 'external' : 'local'}
      href="https://example.com"
      >CTA text link</c4d-text-cta
    >
  `,
  button: (renderIcon) => html`
    <c4d-button
      slot="action"
      cta-type=${renderIcon === iconMap.Launch20 ? 'external' : 'local'}
      href="https://example.com"
      >CTA Button link</c4d-button
    >
  `,
  buttonGroup: (renderIcon, target) => html`
    <c4d-button-group slot="action">
      <c4d-button-group-item target="${target}" href="https://example.com">
        Secondary Button ${renderIcon}
      </c4d-button-group-item>
      <c4d-button-group-item target="${target}" href="https://example.com">
        Primary button ${renderIcon}
      </c4d-button-group-item>
    </c4d-button-group>
  `,
};

const ctaTypeOptions = {
  Text: 'text',
  Button: 'button',
  'Button group': 'buttonGroup',
};

const contentItemTextCTA = ({ heading, copy, links }) => html`
  <c4d-cta-block-item>
    <c4d-content-item-heading>${heading}</c4d-content-item-heading>
    <c4d-content-item-copy>${copy}</c4d-content-item-copy>
    ${links.map(
      (elem) =>
        html`
          <c4d-text-cta
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="${elem.href}"
            >${elem.copy}</c4d-text-cta
          >
        `
    )}
  </c4d-cta-block-item>
`;

const renderItems = (item, count) => {
  return html`
    <c4d-cta-block-item-row no-border>
      ${count.map((_, index) => item({ ...content[index] }))}
    </c4d-cta-block-item-row>
  `;
};

export const Default = (args) => {
  const { heading, border, copy, renderIcon, cta } = args?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  const headingComponent = document.querySelector('c4d-content-block-heading');

  if (headingComponent) {
    headingComponent!.shadowRoot!.innerHTML = heading;
  }

  return html`
    <c4d-cta-block ?no-border=${!border}>
      <c4d-content-block-heading
        >${ifDefined(heading)}</c4d-content-block-heading
      >
      <c4d-content-block-copy>${copy}</c4d-content-block-copy>
      ${renderCTA[cta](renderIcon, target)}
    </c4d-cta-block>
  `;
};

export const WithContentItems = (args) => {
  const { heading, border, copy, renderIcon, cta } = args?.CTABlock ?? {};
  const { contentItemType, contentItemCount } = args?.WithContentItems ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  const headingComponent = document.querySelector('c4d-content-block-heading');

  if (headingComponent) {
    headingComponent!.shadowRoot!.innerHTML = heading;
  }

  return html`
    <c4d-cta-block ?no-border=${!border}>
      <c4d-content-block-heading
        >${ifDefined(heading)}</c4d-content-block-heading
      >
      <c4d-content-block-copy>${ifDefined(copy)}</c4d-content-block-copy>
      ${renderCTA[cta](renderIcon, target)}
      ${renderItems(contentItemType, contentItemCount)}
    </c4d-cta-block>
  `;
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
    propsSet: {
      default: {
        WithContentItems: {
          contentItemType: contentItemTextCTA,
          contentItemCount: Array(3),
        },
      },
    },
  },
};

export const WithLinkList = (args) => {
  const { border, heading, copy, renderIcon, cta } = args?.CTABlock ?? {};
  const target = renderIcon === iconMap.Launch20 ? '_blank' : '';

  const headingComponent = document.querySelector('c4d-content-block-heading');

  if (headingComponent) {
    headingComponent!.shadowRoot!.innerHTML = heading;
  }

  return html`
    <c4d-cta-block ?no-border=${!border}>
      <c4d-content-block-heading
        >${ifDefined(heading)}</c4d-content-block-heading
      >
      <c4d-content-block-copy>${ifDefined(copy)}</c4d-content-block-copy>

      ${renderCTA[cta](renderIcon, target)}

      <c4d-link-list slot="link-list" type="end">
        <c4d-link-list-heading
          >More ways to explore DevOps</c4d-link-list-heading
        >
        <c4d-link-list-item href="https://example.com">
          Events ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Blogs ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Training ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Developer resources ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          Research ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          News ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
      </c4d-link-list>
    </c4d-cta-block>
  `;
};

WithLinkList.story = {
  name: 'With link list',
};

export const WithinTabs = (args) => {
  const { contentItemType, contentItemCount } = args?.WithinTabs ?? {};

  return html`
    <c4d-tabs-extended orientation="horizontal">
      <c4d-tab label="Tab 1" selected>
        <c4d-cta-block>
          <c4d-content-block-heading>Tab 1</c4d-content-block-heading>
          ${renderItems(contentItemType, contentItemCount)}
        </c4d-cta-block>
      </c4d-tab>
      <c4d-tab label="Tab 2">
        <c4d-cta-block>
          <c4d-content-block-heading>Tab 2</c4d-content-block-heading>
          ${renderItems(contentItemType, contentItemCount)}
        </c4d-cta-block>
      </c4d-tab>
      <c4d-tab label="Tab 3">
        <c4d-cta-block>
          <c4d-content-block-heading>Tab 3</c4d-content-block-heading>
          ${renderItems(contentItemType, contentItemCount)}
        </c4d-cta-block>
      </c4d-tab>
    </c4d-tabs-extended>
  `;
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
    propsSet: {
      default: {
        WithinTabs: {
          contentItemType: contentItemTextCTA,
          contentItemCount: Array(3),
        },
      },
    },
  },
};

export default {
  title: 'Components/CTA block',
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    knobs: {
      CTABlock: () => ({
        heading: textNullable('Heading (required)', 'Take the next step'),
        border: boolean('Border', false),
        copy: 'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
        cta: select('CTA type', ctaTypeOptions, ctaTypeOptions['Button group']),
        renderIcon:
          iconMap[select(`Icon`, iconOptions, iconOptions['Arrow Right']) ?? 0],
      }),
    },
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        CTABlock: {
          heading: 'Take the next step',
          border: false,
          cta: 'buttonGroup',
          copy: 'Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.',
          renderIcon: iconOptions['Arrow Right'],
        },
      },
    },
  },
};
